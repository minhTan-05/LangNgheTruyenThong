using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using Scalar.AspNetCore; // Khai báo thư viện giao diện mới
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// 1. Đăng ký Database SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Cấu hình CORS cho phép Frontend React (localhost:3000) gọi API không bị chặn
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. Thêm Controllers, xử lý vòng lặp JSON và OpenAPI (Chuẩn của .NET 9)
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi(); // Thay thế cho AddSwaggerGen() cũ

var app = builder.Build();

// 3. Bật giao diện Scalar (Thay thế SwaggerUI)
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(); // Kích hoạt màn hình test API
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
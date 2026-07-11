using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SanPhamController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var danhSach = await _context.SanPham
                .Include(sp => sp.LangNghe)
                .OrderByDescending(sp => sp.MaSanPham)
                .ToListAsync();
            return Ok(danhSach);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var sanPham = await _context.SanPham
                .Include(sp => sp.LangNghe)
                .FirstOrDefaultAsync(sp => sp.MaSanPham == id);
            if (sanPham == null) return NotFound();
            return Ok(sanPham);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SanPham sanPham)
        {
            if (string.IsNullOrEmpty(sanPham.DuongDanSlug))
            {
                sanPham.DuongDanSlug = sanPham.TenSanPham.ToLower().Replace(" ", "-").Replace("đ", "d");
            }
            _context.SanPham.Add(sanPham);
            await _context.SaveChangesAsync();
            return Ok(sanPham);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SanPham sanPham)
        {
            if (id != sanPham.MaSanPham) return BadRequest("Mã sản phẩm không khớp.");

            _context.Entry(sanPham).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.SanPham.Any(e => e.MaSanPham == id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sanPham = await _context.SanPham.FindAsync(id);
            if (sanPham == null) return NotFound();

            _context.SanPham.Remove(sanPham);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
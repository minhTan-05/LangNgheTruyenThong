using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonHangController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DonHangController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var danhSach = await _context.DonHang
                .Include(d => d.LangNghe)
                .Include(d => d.DanhSachChiTiet)
                .OrderByDescending(d => d.NgayDat)
                .ToListAsync();
            return Ok(danhSach);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var donHang = await _context.DonHang
                .Include(d => d.LangNghe)
                .Include(d => d.DanhSachChiTiet)
                .FirstOrDefaultAsync(d => d.MaDonHang == id);
            if (donHang == null) return NotFound();
            return Ok(donHang);
        }

        [HttpPost]
        public async Task<IActionResult> Create(DonHang donHang)
        {
            if (string.IsNullOrEmpty(donHang.MaCode))
            {
                donHang.MaCode = $"#SYS-{DateTime.Now.Ticks % 10000:D4}";
            }
            donHang.NgayDat = DateTime.Now;
            _context.DonHang.Add(donHang);
            await _context.SaveChangesAsync();
            return Ok(donHang);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DonHang donHang)
        {
            if (id != donHang.MaDonHang) return BadRequest("Mã đơn hàng không khớp.");

            _context.Entry(donHang).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.DonHang.Any(e => e.MaDonHang == id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var donHang = await _context.DonHang.FindAsync(id);
            if (donHang == null) return NotFound();

            _context.DonHang.Remove(donHang);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

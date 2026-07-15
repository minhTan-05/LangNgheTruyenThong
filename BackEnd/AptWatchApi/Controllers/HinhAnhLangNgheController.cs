using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HinhAnhLangNgheController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HinhAnhLangNgheController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HinhAnhLangNghe>>> GetHinhAnhLangNghe()
        {
            return await _context.HinhAnhLangNghe.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HinhAnhLangNghe>> GetHinhAnhLangNghe(int id)
        {
            var item = await _context.HinhAnhLangNghe.FindAsync(id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpGet("byVillage/{maLangNghe}")]
        public async Task<ActionResult<IEnumerable<HinhAnhLangNghe>>> GetByVillage(int maLangNghe)
        {
            return await _context.HinhAnhLangNghe
                .Where(h => h.MaLangNghe == maLangNghe)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<HinhAnhLangNghe>> PostHinhAnhLangNghe(HinhAnhLangNghe hinhAnh)
        {
            _context.HinhAnhLangNghe.Add(hinhAnh);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetHinhAnhLangNghe), new { id = hinhAnh.MaHinhAnh }, hinhAnh);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHinhAnhLangNghe(int id, HinhAnhLangNghe hinhAnh)
        {
            if (id != hinhAnh.MaHinhAnh) return BadRequest();
            _context.Entry(hinhAnh).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HinhAnhExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHinhAnhLangNghe(int id)
        {
            var item = await _context.HinhAnhLangNghe.FindAsync(id);
            if (item == null) return NotFound();
            _context.HinhAnhLangNghe.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool HinhAnhExists(int id)
        {
            return _context.HinhAnhLangNghe.Any(e => e.MaHinhAnh == id);
        }
    }
}

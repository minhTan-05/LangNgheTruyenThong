using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourTraiNghiemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TourTraiNghiemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var danhSach = await _context.TourTraiNghiem
                .Include(t => t.LangNghe)
                .OrderByDescending(t => t.MaTour)
                .ToListAsync();
            return Ok(danhSach);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TourTraiNghiem tour)
        {
            _context.TourTraiNghiem.Add(tour);
            await _context.SaveChangesAsync();
            return Ok(tour);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tour = await _context.TourTraiNghiem.FindAsync(id);
            if (tour == null) return NotFound();
            _context.TourTraiNghiem.Remove(tour);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

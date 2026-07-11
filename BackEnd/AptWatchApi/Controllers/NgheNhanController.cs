using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NgheNhanController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NgheNhanController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var danhSach = await _context.NgheNhan
                .Include(n => n.LangNghe)
                .OrderByDescending(n => n.MaNgheNhan)
                .ToListAsync();
            return Ok(danhSach);
        }

        [HttpPost]
        public async Task<IActionResult> Create(NgheNhan ngheNhan)
        {
            _context.NgheNhan.Add(ngheNhan);
            await _context.SaveChangesAsync();
            return Ok(ngheNhan);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, NgheNhan ngheNhan)
        {
            if (id != ngheNhan.MaNgheNhan) return BadRequest();
            _context.Entry(ngheNhan).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ngheNhan = await _context.NgheNhan.FindAsync(id);
            if (ngheNhan == null) return NotFound();
            _context.NgheNhan.Remove(ngheNhan);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

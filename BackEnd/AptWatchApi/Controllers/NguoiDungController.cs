using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NguoiDungController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NguoiDungController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/NguoiDung
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetAll()
        {
            return Ok(await _context.NguoiDung.OrderByDescending(n => n.NgayTao).ToListAsync());
        }

        // GET: api/NguoiDung/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NguoiDung>> GetById(int id)
        {
            var nguoiDung = await _context.NguoiDung.FindAsync(id);
            if (nguoiDung == null) return NotFound();
            return Ok(nguoiDung);
        }

        // POST: api/NguoiDung
        [HttpPost]
        public async Task<ActionResult<NguoiDung>> Create(NguoiDung nguoiDung)
        {
            _context.NguoiDung.Add(nguoiDung);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = nguoiDung.MaNguoiDung }, nguoiDung);
        }

        // DELETE: api/NguoiDung/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var nguoiDung = await _context.NguoiDung.FindAsync(id);
            if (nguoiDung == null) return NotFound();

            _context.NguoiDung.Remove(nguoiDung);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

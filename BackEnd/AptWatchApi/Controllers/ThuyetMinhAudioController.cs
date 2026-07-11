using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThuyetMinhAudioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ThuyetMinhAudioController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var danhSach = await _context.ThuyetMinhAudio
                .Include(a => a.LangNghe)
                .OrderByDescending(a => a.MaThuyetMinh)
                .ToListAsync();
            return Ok(danhSach);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ThuyetMinhAudio audio)
        {
            _context.ThuyetMinhAudio.Add(audio);
            await _context.SaveChangesAsync();
            return Ok(audio);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var audio = await _context.ThuyetMinhAudio.FindAsync(id);
            if (audio == null) return NotFound();
            _context.ThuyetMinhAudio.Remove(audio);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

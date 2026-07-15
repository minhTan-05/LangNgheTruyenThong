using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoLangNgheController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VideoLangNgheController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VideoLangNghe>>> GetVideoLangNghe()
        {
            return await _context.VideoLangNghe.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VideoLangNghe>> GetVideoLangNghe(int id)
        {
            var item = await _context.VideoLangNghe.FindAsync(id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpGet("byVillage/{maLangNghe}")]
        public async Task<ActionResult<IEnumerable<VideoLangNghe>>> GetByVillage(int maLangNghe)
        {
            return await _context.VideoLangNghe
                .Where(v => v.MaLangNghe == maLangNghe)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<VideoLangNghe>> PostVideoLangNghe(VideoLangNghe video)
        {
            _context.VideoLangNghe.Add(video);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVideoLangNghe), new { id = video.MaVideo }, video);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutVideoLangNghe(int id, VideoLangNghe video)
        {
            if (id != video.MaVideo) return BadRequest();
            _context.Entry(video).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideoExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideoLangNghe(int id)
        {
            var item = await _context.VideoLangNghe.FindAsync(id);
            if (item == null) return NotFound();
            _context.VideoLangNghe.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool VideoExists(int id)
        {
            return _context.VideoLangNghe.Any(e => e.MaVideo == id);
        }
    }
}

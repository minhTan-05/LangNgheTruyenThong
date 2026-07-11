using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LangNgheController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LangNgheController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LangNghe
        // Lấy danh sách tất cả các làng nghề ( kèm thông tin Nhóm Nghề )
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LangNghe>>> GetAll()
        {
            var danhSach = await _context.LangNghe
                .Include(l => l.NhomNghe)
                .OrderByDescending(l => l.DiemDanhGia)
                .ToListAsync();

            return Ok(danhSach);
        }

        // GET: api/LangNghe/5
        // Lấy chi tiết một làng nghề theo MaLangNghe
        [HttpGet("{id}")]
        public async Task<ActionResult<LangNghe>> GetById(int id)
        {
            var langNghe = await _context.LangNghe
                .Include(l => l.NhomNghe)
                .Include(l => l.DanhSachSanPham)
                .Include(l => l.DanhSachNgheNhan)
                .Include(l => l.DanhSachAudio)
                .Include(l => l.DanhSachTour)
                .Include(l => l.DanhSachDanhGia)
                .FirstOrDefaultAsync(l => l.MaLangNghe == id);

            if (langNghe == null)
            {
                return NotFound(new { message = $"Không tìm thấy làng nghề với mã số {id}" });
            }

            return Ok(langNghe);
        }

        // GET: api/LangNghe/slug/lang-gom-bat-trang
        // Lấy chi tiết làng nghề theo đường dẫn Slug
        [HttpGet("slug/{slug}")]
        public async Task<ActionResult<LangNghe>> GetBySlug(string slug)
        {
            var langNghe = await _context.LangNghe
                .Include(l => l.NhomNghe)
                .Include(l => l.DanhSachSanPham)
                .Include(l => l.DanhSachNgheNhan)
                .Include(l => l.DanhSachAudio)
                .Include(l => l.DanhSachTour)
                .Include(l => l.DanhSachDanhGia)
                .FirstOrDefaultAsync(l => l.DuongDanSlug == slug);

            if (langNghe == null)
            {
                return NotFound(new { message = $"Không tìm thấy làng nghề với slug '{slug}'" });
            }

            return Ok(langNghe);
        }

        // POST: api/LangNghe
        [HttpPost]
        public async Task<ActionResult<LangNghe>> Create(LangNghe langNghe)
        {
            _context.LangNghe.Add(langNghe);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = langNghe.MaLangNghe }, langNghe);
        }

        // PUT: api/LangNghe/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, LangNghe langNghe)
        {
            if (id != langNghe.MaLangNghe)
            {
                return BadRequest(new { message = "ID trong URL không khớp với ID làng nghề" });
            }

            _context.Entry(langNghe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.LangNghe.AnyAsync(l => l.MaLangNghe == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/LangNghe/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var langNghe = await _context.LangNghe.FindAsync(id);
            if (langNghe == null)
            {
                return NotFound();
            }

            _context.LangNghe.Remove(langNghe);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
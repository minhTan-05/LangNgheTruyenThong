using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptWatchApi.Data;
using AptWatchApi.Models;

namespace AptWatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhomNgheController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NhomNgheController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/NhomNghe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhomNghe>>> GetAll()
        {
            var danhSach = await _context.NhomNghe.ToListAsync();
            return Ok(danhSach);
        }
    }
}

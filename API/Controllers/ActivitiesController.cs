using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace API.Controllers
{
    public class ActivitiesController(AppDbContext context) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await context.activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivitie(string id)
        {
            var activity = await context.activities.FindAsync(id);
            if (activity == null) return NotFound();
            return Ok(activity);
        }
    }

}

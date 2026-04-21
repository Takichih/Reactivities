using Application.Activities.Command;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetails(string id)
        {
            return await Mediator.Send(new GetActivityDetails.Query{Id = id});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            await Mediator.Send(new DeleteActivity.Delete{Id = id});
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(Activity activity)
        {
            return await Mediator.Send(new CreateActivity.Command{Activity = activity});
        }

        [HttpPut]
        public async Task<ActionResult<string>> EditActivity(Activity activity)
        {
            await Mediator.Send(new EditActivity.Command{Activity = activity});
            return NoContent();
        }
    }

}

using System;
using System.Data.Common;
using Domain;
using MediatR;
using Microsoft.VisualBasic;
using Persistance;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Activity>
    {
        public required string Id { get; set; }
    }

    public class Hundler(AppDbContext context) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.activities.FindAsync([request.Id],cancellationToken);
            if (activity == null) throw new Exception("Not Found");
            return activity;
        }
    }
}

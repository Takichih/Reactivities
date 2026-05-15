using System;
using System.Data.Common;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.VisualBasic;
using Persistance;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<Activity>>
    {
        public required string Id { get; set; }
    }

    public class Hundler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.activities.FindAsync([request.Id],cancellationToken);
            if (activity == null) return Result<Activity>.Failure("Activity not found", 404);
            
            return Result<Activity>.Success(activity);
        }
    }
}

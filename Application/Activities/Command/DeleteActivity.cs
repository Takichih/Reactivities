using System;
using System.Reflection.Metadata;
using Application.Core;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities.Command;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.activities
            .FindAsync([request.Id], cancellationToken);

            if (activity == null) return await Task.FromResult(Result<Unit>.Failure("Activity not found", 404));

            context.Remove(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return await Task.FromResult(Result<Unit>.Failure("Failed to delete the activity", 404));
            return await Task.FromResult(Result<Unit>.Success(Unit.Value));
        }
    }
}

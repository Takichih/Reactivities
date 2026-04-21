using System;
using System.Reflection.Metadata;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities.Command;

public class DeleteActivity
{
    public class Delete : IRequest
    {
        public required string Id { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Delete>
    {
        public async Task Handle(Delete request, CancellationToken cancellationToken)
        {
            var act = await context.activities.FindAsync(request.Id, cancellationToken) 
            ?? throw new Exception("Not found");

            context.Remove(act);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}

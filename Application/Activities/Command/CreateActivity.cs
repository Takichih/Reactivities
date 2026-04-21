using Domain;
using MediatR;
using Persistance;

namespace Application.Activities.Command;

public class CreateActivity
{
    public class Command : IRequest<string>
    {
        public required Activity Activity { get; set; }
    }

    public class Hundler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.activities.Add(request.Activity);
            await context.SaveChangesAsync(cancellationToken);

            return request.Activity.Id;
        }
    }
}
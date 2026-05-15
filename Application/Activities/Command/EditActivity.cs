using System;
using System.Data.Common;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities.Command;

public class EditActivity
{
    public class Command: IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.activities
            .FindAsync([request.ActivityDto.Id], cancellationToken) ;
            if (activity == null) return await Task.FromResult(Result<Unit>.Failure("Activity not found", 404));

            mapper.Map(request.ActivityDto,activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return await Task.FromResult(Result<Unit>.Failure("Failed to delete the activity", 404));
            return await Task.FromResult(Result<Unit>.Success(Unit.Value));

        }
    }

}

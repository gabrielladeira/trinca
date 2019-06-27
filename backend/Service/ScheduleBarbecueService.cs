using System;
using System.Collections.Generic;

using TrincaBarbecueApi.Domain.Entities;
using TrincaBarbecueApi.Data.Repository;

namespace TrincaBarbecueApi.Service
{
    public class ScheduleBarbecueService
    {
        private readonly BarbecueRepository _barbecueRepository;

        public ScheduleBarbecueService(BarbecueRepository barbecueRepository)
        {
            _barbecueRepository = barbecueRepository;
        }
        public Barbecue Run(Barbecue barbecue)
        {
            if (barbecue.ScheduledTo.Date < DateTime.Today)
            {
                throw new Exception("A data agendada deve ser igual ou superior ao dia de hj");
            }

            var newBarbecue = new Barbecue
            {
                Description = barbecue.Description,
                Observations = barbecue.Observations,
                Participants = barbecue.Participants,
                SuggestedPriceWithDrinks = barbecue.SuggestedPriceWithDrinks,
                SuggestedPriceWithouDrinks = barbecue.SuggestedPriceWithouDrinks,
                ScheduledTo = barbecue.ScheduledTo,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _barbecueRepository.Add(newBarbecue);

            return newBarbecue;
        }
    }
}
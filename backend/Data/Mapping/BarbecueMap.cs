using MongoDB.Bson.Serialization;

using TrincaBarbecueApi.Domain.Entities;

namespace TrincaBarbecueApi.Data.Mapping
{
    internal class BarbecueMap : BsonClassMap<Barbecue>
    {
        public BarbecueMap()
        {
            this.AutoMap();
            this.SetIdMember(this.GetMemberMap(self => self.Id));
            this.GetMemberMap(self => self.Description).SetIgnoreIfNull(true);
            this.GetMemberMap(self => self.Observations).SetIgnoreIfNull(true);
            this.GetMemberMap(self => self.ScheduledTo).SetIsRequired(true);
            this.GetMemberMap(self => self.UpdatedAt).SetIsRequired(true);
            this.GetMemberMap(self => self.CreatedAt).SetIsRequired(true);
            this.GetMemberMap(self => self.Participants).SetIgnoreIfNull(true);
            this.GetMemberMap(self => self.SuggestedPriceWithDrinks).SetIgnoreIfNull(true);
            this.GetMemberMap(self => self.SuggestedPriceWithouDrinks).SetIgnoreIfNull(true);
        }
    }
}
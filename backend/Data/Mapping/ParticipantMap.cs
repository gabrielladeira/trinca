using MongoDB.Bson.Serialization;

using TrincaBarbecueApi.Domain.Entities;

namespace TrincaBarbecueApi.Data.Mapping
{
    internal class ParticipantMap : BsonClassMap<Participant>
    {
        public ParticipantMap()
        {
            this.AutoMap();
            this.GetMemberMap(self => self.Name).SetIsRequired(true);
            this.GetMemberMap(self => self.Paid).SetDefaultValue(false).SetIgnoreIfDefault(true);
            this.GetMemberMap(self => self.WillDrink).SetIsRequired(true);
            this.GetMemberMap(self => self.ValueToPay).SetIsRequired(true);
            this.GetMemberMap(self => self.Observations).SetIgnoreIfNull(true);
        }
    }
}
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TrincaBarbecueApi.Domain.Entities
{
    public abstract class BaseEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public virtual string Id { get; set; }
    }
}
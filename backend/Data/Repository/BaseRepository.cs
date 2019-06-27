using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Bson;

using TrincaBarbecueApi.Domain.Entities;

namespace TrincaBarbecueApi.Data.Repository
{
    public abstract class BaseRepository<T> where T : BaseEntity
    {
        private IMongoDatabase _database;

        /// <summary>
        /// Gets the collection of <typeparamref name="T"/>.
        /// </summary>
        protected IMongoCollection<T> Collection
        {
            get
            {
                return this.Database.GetCollection<T>(this.GetCollectionName());
            }
        }

        /// <summary>
        /// Gets the application's database.
        /// </summary>
        protected IMongoDatabase Database
        {
            get
            {
                return this._database ?? (this._database = GetDatabase());
            }
        }

        /// <summary>
        /// Gets a list of <typeparamref name="T"/>.
        /// </summary>
        /// <returns>an instance of <typeparamref name="T"/>.</returns>
        public IEnumerable<T> Find()
        {
            return this.Collection
                .Find<T>(t => true)
                .ToEnumerable();
        }

        /// <summary>
        /// Gets a single <typeparamref name="T"/>.
        /// </summary>
        /// <param name="id">the entity's unique identifier.</param>
        /// <returns>an instance of <typeparamref name="T"/>.</returns>
        public T FindOne(string id)
        {
            // var filter = new BsonDocument("_id", ObjectId.Parse(id));
            return this.Collection.Find<T>(x => x.Id == id)
                .FirstOrDefault();
        }

        /// <summary>
        /// Adds an entity.
        /// </summary>
        /// <param name="entity">an instance of <typeparamref name="T"/>.</param>
        public void Add(T entity)
        {
            this.Collection.InsertOne(entity);
        }

        public void Update(string id, UpdateDefinition<T> update)
        {
            this.Collection.UpdateOne(t => t.Id == id, update);
        }

        /// <summary>
        /// Removes an entity.
        /// </summary>
        /// <param name="id">the document unique identifier.</param>
        public void Remove(string id)
        {
            this.Collection.DeleteOne(t => t.Id == id);
        }

        protected abstract IMongoDatabase GetDatabase();

        protected abstract string GetCollectionName();
    }
}

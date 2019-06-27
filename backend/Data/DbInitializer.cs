using System.Collections.Generic;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;

using TrincaBarbecueApi.Data.Mapping;

namespace TrincaBarbecueApi.Data
{
    /// <summary>
    /// Mongodb initializer.
    /// </summary>
    public class DbInitializer
    {
        /// <summary>
        /// Setup application's convention.
        /// </summary>
        private static void SetupConventions()
        {
            var conventions = new IConvention[] {
                new StringObjectIdIdGeneratorConvention(),
                new CamelCaseElementNameConvention()
            };

            var idx = 0;
            foreach (var convention in conventions)
            {
                var pack = new ConventionPack();
                pack.Add(convention);

                ConventionRegistry.Register(
                    string.Format("TrincaBarbecueApi.Conventions[{0}]", idx++),
                    pack,
                    t => true);
            }

        }

        /// <summary>
        /// Setup application's mapping.
        /// </summary>
        private static void SetupMapping()
        {
            IEnumerable<BsonClassMap> maps = new BsonClassMap[] {
                new BarbecueMap(),
                new ParticipantMap()
            };

            foreach (var map in maps)
            {
                BsonClassMap.RegisterClassMap(map);
            }
        }

        public static void Setup()
        {
            SetupConventions();
            SetupMapping();
        }
    }
}
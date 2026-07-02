using App.Api.Accessors;
using App.Api.Utilities;
using App.ServiceInvoker.Interfaces;
using Contracts.Domain.Database;
using Contracts.Dto;

namespace App.Api.Managers
{
    public class PoemManager : IManagerService
    {
        private readonly IDatabaseAccessor _databaseAccessor;
        private readonly LocalPoemSeedService _localPoemSeedService;

        public PoemManager(IDatabaseAccessor databaseAccessor, LocalPoemSeedService localPoemSeedService)
        {
            _databaseAccessor = databaseAccessor;
            _localPoemSeedService = localPoemSeedService;
        }

        public async Task<FeaturedPoemListDto> GetFeaturedPoems(GetFeaturedPoemsRequestDto request)
        {
            await _localPoemSeedService.EnsureSeedData();
            var poems = await _databaseAccessor.GetDocumentsByProperty<Poem>(
                poem => poem.IsFeaturedOnHome,
                orderby: poem => poem.FeaturedOrder,
                descending: false);

            return new FeaturedPoemListDto
            {
                Poems = poems
                    .Select(poem => new FeaturedPoemDto
                    {
                        PoemId = poem.Id,
                        Title = poem.Title,
                        Author = poem.Author,
                        IllustrationPath = poem.IllustrationPath,
                        FeaturedOrder = poem.FeaturedOrder
                    })
                    .ToList()
            };
        }

        public async Task<PoemDetailDto?> GetPoemDetail(GetPoemDetailRequestDto request)
        {
            await _localPoemSeedService.EnsureSeedData();
            if (request.PoemId == Guid.Empty)
            {
                return null;
            }

            var poem = await _databaseAccessor.GetDocumentById<Poem>(request.PoemId);
            if (poem == null)
            {
                return null;
            }

            return new PoemDetailDto
            {
                PoemId = poem.Id,
                Title = poem.Title,
                Author = poem.Author,
                Lines = poem.Lines,
                IllustrationPath = poem.IllustrationPath
            };
        }
    }
}

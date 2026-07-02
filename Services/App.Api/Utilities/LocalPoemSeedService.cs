using App.Api.Accessors;
using Contracts.Domain.Database;
using Microsoft.AspNetCore.Hosting;

namespace App.Api.Utilities
{
    public class LocalPoemSeedService
    {
        private readonly IDatabaseAccessor _databaseAccessor;
        private readonly IWebHostEnvironment _environment;

        public LocalPoemSeedService(IDatabaseAccessor databaseAccessor, IWebHostEnvironment environment)
        {
            _databaseAccessor = databaseAccessor;
            _environment = environment;
        }

        public async Task EnsureSeedData()
        {
            if (!_environment.IsDevelopment())
            {
                return;
            }

            var existingPoems = await _databaseAccessor.GetAllDocuments<Poem>(0, 1);
            if (existingPoems.Any())
            {
                return;
            }

            var poems = new List<Poem>
            {
                new()
                {
                    Title = "月下独酌",
                    Author = "李白",
                    IllustrationPath = "/poems/moon-river.svg",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 1,
                    Lines = new List<string>
                    {
                        "花间一壶酒，独酌无相亲。",
                        "举杯邀明月，对影成三人。",
                        "月既不解饮，影徒随我身。",
                        "暂伴月将影，行乐须及春。"
                    }
                },
                new()
                {
                    Title = "春江花月夜",
                    Author = "张若虚",
                    IllustrationPath = "/poems/crane-cloud.svg",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 2,
                    Lines = new List<string>
                    {
                        "春江潮水连海平，海上明月共潮生。",
                        "滟滟随波千万里，何处春江无月明。",
                        "江流宛转绕芳甸，月照花林皆似霰。",
                        "空里流霜不觉飞，汀上白沙看不见。"
                    }
                },
                new()
                {
                    Title = "青玉案·元夕",
                    Author = "辛弃疾",
                    IllustrationPath = "/poems/lotus-lamp.svg",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 3,
                    Lines = new List<string>
                    {
                        "东风夜放花千树。更吹落、星如雨。",
                        "宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。",
                        "蛾儿雪柳黄金缕。笑语盈盈暗香去。",
                        "众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。"
                    }
                }
            };

            foreach (var poem in poems)
            {
                await _databaseAccessor.InsertDocument(poem);
            }
        }
    }
}

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

            var poems = new List<Poem>
            {
                new()
                {
                    Title = "月下独酌",
                    Author = "李白",
                    IllustrationPath = "/poems/yuexia.png",
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
                    IllustrationPath = "/poems/chunjiang.png",
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
                    IllustrationPath = "/poems/qingyu.png",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 3,
                    Lines = new List<string>
                    {
                        "东风夜放花千树。更吹落、星如雨。",
                        "宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。",
                        "蛾儿雪柳黄金缕。笑语盈盈暗香去。",
                        "众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。"
                    }
                },
                new()
                {
                    Title = "静夜思",
                    Author = "李白",
                    IllustrationPath = "/poems/01_jingye_si.png",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 4,
                    Lines = new List<string>
                    {
                        "床前明月光，疑是地上霜。",
                        "举头望明月，低头思故乡。"
                    }
                },
                new()
                {
                    Title = "水调歌头·明月几时有",
                    Author = "苏轼",
                    IllustrationPath = "/poems/02_shuidiao_getou.png",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 5,
                    Lines = new List<string>
                    {
                        "明月几时有？把酒问青天。",
                        "不知天上宫阙，今夕是何年。",
                        "我欲乘风归去，又恐琼楼玉宇，高处不胜寒。",
                        "起舞弄清影，何似在人间。",
                        "转朱阁，低绮户，照无眠。",
                        "不应有恨，何事长向别时圆？",
                        "人有悲欢离合，月有阴晴圆缺，此事古难全。",
                        "但愿人长久，千里共婵娟。"
                    }
                },
                new()
                {
                    Title = "枫桥夜泊",
                    Author = "张继",
                    IllustrationPath = "/poems/03_fengqiao_yebo.png",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 6,
                    Lines = new List<string>
                    {
                        "月落乌啼霜满天，江枫渔火对愁眠。",
                        "姑苏城外寒山寺，夜半钟声到客船。"
                    }
                },
                new()
                {
                    Title = "望庐山瀑布",
                    Author = "李白",
                    IllustrationPath = "/poems/04_wanglushan_pubu.png",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 7,
                    Lines = new List<string>
                    {
                        "日照香炉生紫烟，遥看瀑布挂前川。",
                        "飞流直下三千尺，疑是银河落九天。"
                    }
                },
                new()
                {
                    Title = "江雪",
                    Author = "柳宗元",
                    IllustrationPath = "/poems/05_jiangxue.png",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 8,
                    Lines = new List<string>
                    {
                        "千山鸟飞绝，万径人踪灭。",
                        "孤舟蓑笠翁，独钓寒江雪。"
                    }
                },
                new()
                {
                    Title = "念奴娇·赤壁怀古",
                    Author = "苏轼",
                    IllustrationPath = "/poems/06_niannu_jiao.png",
                    IsFeaturedOnHome = true,
                    FeaturedOrder = 9,
                    Lines = new List<string>
                    {
                        "大江东去，浪淘尽，千古风流人物。",
                        "故垒西边，人道是，三国周郎赤壁。",
                        "乱石穿空，惊涛拍岸，卷起千堆雪。",
                        "江山如画，一时多少豪杰。",
                        "遥想公瑾当年，小乔初嫁了，雄姿英发。",
                        "羽扇纶巾，谈笑间，樯橹灰飞烟灭。",
                        "故国神游，多情应笑我，早生华发。",
                        "人生如梦，一尊还酹江月。"
                    }
                },
                new()
                {
                    Title = "登鹳雀楼",
                    Author = "王之涣",
                    IllustrationPath = "/poems/07_deng_guanque_lou.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "白日依山尽，黄河入海流。",
                        "欲穷千里目，更上一层楼。"
                    }
                },
                new()
                {
                    Title = "虞美人·春花秋月何时了",
                    Author = "李煜",
                    IllustrationPath = "/poems/08_yumeiren.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "春花秋月何时了，往事知多少。",
                        "小楼昨夜又东风，故国不堪回首月明中。",
                        "雕栏玉砌应犹在，只是朱颜改。",
                        "问君能有几多愁，恰似一江春水向东流。"
                    }
                },
                new()
                {
                    Title = "天净沙·秋思",
                    Author = "马致远",
                    IllustrationPath = "/poems/09_tianjingsha.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "枯藤老树昏鸦，小桥流水人家，古道西风瘦马。",
                        "夕阳西下，断肠人在天涯。"
                    }
                },
                new()
                {
                    Title = "将进酒",
                    Author = "李白",
                    IllustrationPath = "/poems/10_qiangjinjiu.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "君不见，黄河之水天上来，奔流到海不复回。",
                        "君不见，高堂明镜悲白发，朝如青丝暮成雪。",
                        "人生得意须尽欢，莫使金樽空对月。",
                        "天生我材必有用，千金散尽还复来。",
                        "烹羊宰牛且为乐，会须一饮三百杯。",
                        "岑夫子，丹丘生，将进酒，杯莫停。",
                        "与君歌一曲，请君为我倾耳听。",
                        "钟鼓馔玉不足贵，但愿长醉不愿醒。",
                        "古来圣贤皆寂寞，惟有饮者留其名。",
                        "陈王昔时宴平乐，斗酒十千恣欢谑。",
                        "主人何为言少钱，径须沽取对君酌。",
                        "五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。"
                    }
                },
                new()
                {
                    Title = "游子吟",
                    Author = "孟郊",
                    IllustrationPath = "/poems/11_youzi_yin.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "慈母手中线，游子身上衣。",
                        "临行密密缝，意恐迟迟归。",
                        "谁言寸草心，报得三春晖。"
                    }
                },
                new()
                {
                    Title = "敕勒歌",
                    Author = "佚名",
                    IllustrationPath = "/poems/12_chile_ge.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "敕勒川，阴山下。",
                        "天似穹庐，笼盖四野。",
                        "天苍苍，野茫茫，风吹草低见牛羊。"
                    }
                },
                new()
                {
                    Title = "小池",
                    Author = "杨万里",
                    IllustrationPath = "/poems/13_xiao_chi.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "泉眼无声惜细流，树阴照水爱晴柔。",
                        "小荷才露尖尖角，早有蜻蜓立上头。"
                    }
                },
                new()
                {
                    Title = "钱塘湖春行",
                    Author = "白居易",
                    IllustrationPath = "/poems/14_qiantang_chunxing.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "孤山寺北贾亭西，水面初平云脚低。",
                        "几处早莺争暖树，谁家新燕啄春泥。",
                        "乱花渐欲迷人眼，浅草才能没马蹄。",
                        "最爱湖东行不足，绿杨阴里白沙堤。"
                    }
                },
                new()
                {
                    Title = "九月九日忆山东兄弟",
                    Author = "王维",
                    IllustrationPath = "/poems/15_jiuyue_jiuri.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "独在异乡为异客，每逢佳节倍思亲。",
                        "遥知兄弟登高处，遍插茱萸少一人。"
                    }
                },
                new()
                {
                    Title = "出塞",
                    Author = "王昌龄",
                    IllustrationPath = "/poems/16_chu_sai.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "秦时明月汉时关，万里长征人未还。",
                        "但使龙城飞将在，不教胡马度阴山。"
                    }
                },
                new()
                {
                    Title = "悯农",
                    Author = "李绅",
                    IllustrationPath = "/poems/17_min_nong.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "锄禾日当午，汗滴禾下土。",
                        "谁知盘中餐，粒粒皆辛苦。"
                    }
                },
                new()
                {
                    Title = "咏鹅",
                    Author = "骆宾王",
                    IllustrationPath = "/poems/18_yong_e.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "鹅，鹅，鹅，曲项向天歌。",
                        "白毛浮绿水，红掌拨清波。"
                    }
                },
                new()
                {
                    Title = "寻隐者不遇",
                    Author = "贾岛",
                    IllustrationPath = "/poems/19_xun_yinzhe.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "松下问童子，言师采药去。",
                        "只在此山中，云深不知处。"
                    }
                },
                new()
                {
                    Title = "回乡偶书",
                    Author = "贺知章",
                    IllustrationPath = "/poems/20_huixiang_oushu.png",
                    IsFeaturedOnHome = false,
                    FeaturedOrder = 0,
                    Lines = new List<string>
                    {
                        "少小离家老大回，乡音无改鬓毛衰。",
                        "儿童相见不相识，笑问客从何处来。"
                    }
                }
            };

            var existing = await _databaseAccessor.GetAllDocuments<Poem>(0, int.MaxValue);
            var existingSignatures = new HashSet<string>(
                existing.Select(p => $"{p.Title}|{p.Author}|{p.IllustrationPath}"));

            foreach (var poem in poems)
            {
                var signature = $"{poem.Title}|{poem.Author}|{poem.IllustrationPath}";
                if (existingSignatures.Contains(signature))
                {
                    continue;
                }
                await _databaseAccessor.InsertDocument(poem);
            }
        }
    }
}

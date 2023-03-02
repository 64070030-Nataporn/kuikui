const databook = JSON.parse(`[{
    "id": 1,
    "bookname": "เป็นเราคือพิเศษ",
    "author": "คิดมาก",
    "type": "Self-Help",
    "imagelink": "https://www.b2s.co.th/media/catalog/product/cache/31c1e2dc995f93131e503292bcd47775/5/3/5325315_.jpg"
  }, {
    "id": 2,
    "bookname": "I Can Do It เชื่อสิ ฉันทำได้",
    "author": "Louise Hay",
    "type": "Self-Help",
    "imagelink": "https://storage.naiin.com/system/application/bookstore/resource/product/202209/559210/1000253710_front_XXL.jpg?imgname=I-Can-Do-It-%E0%B9%80%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%B4-%E0%B8%89%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B3%E0%B9%84%E0%B8%94%E0%B9%89"
  }, {
    "id": 3,
    "bookname": "ล่าขุมทรัพย์สุดขอบฟ้าในมอสโก",
    "author": "Popcorn Story",
    "type": "Comics",
    "imagelink": "https://storage.naiin.com/system/application/bookstore/resource/product/202302/572832/1000259087_front_XXL.jpg?imgname=%E0%B8%A5%E0%B9%88%E0%B8%B2%E0%B8%82%E0%B8%B8%E0%B8%A1%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B8%82%E0%B8%AD%E0%B8%9A%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B8%A1%E0%B8%AD%E0%B8%AA%E0%B9%82%E0%B8%81"
  }, {
    "id": 4,
    "bookname": "คุกกี้รันเอาชีวิตรอด 22 จากเมืองเทพเจ้า",
    "author": "Mr. K",
    "type": "Comics",
    "imagelink": "https://storage.naiin.com/system/application/bookstore/resource/product/202302/571741/1000258841_front_XXL.jpg?imgname=%E0%B8%84%E0%B8%B8%E0%B8%81%E0%B8%81%E0%B8%B5%E0%B9%89%E0%B8%A3%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%AD%E0%B8%B2%E0%B8%8A%E0%B8%B5%E0%B8%A7%E0%B8%B4%E0%B8%95%E0%B8%A3%E0%B8%AD%E0%B8%94-22-%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2"
  }, {
    "id": 5,
    "bookname": "ผีอินโดนีเซีย",
    "author": "ทองปราย สตูดิโอ",
    "type": "Mystery",
    "imagelink": "https://storage.naiin.com/system/application/bookstore/resource/product/202301/570015/1000258169_front_XXL.jpg?imgname=%E0%B8%9C%E0%B8%B5%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B9%82%E0%B8%94%E0%B8%99%E0%B8%B5%E0%B9%80%E0%B8%8B%E0%B8%B5%E0%B8%A2"
  }, {
    "id": 6,
    "bookname": "ไขคดีกับโคนันใน 10 นาที เล่ม 3",
    "author": "Gosho AOYAMA, Reiko MATSUDA",
    "type": "Mystery",
    "imagelink": "https://storage.naiin.com/system/application/bookstore/resource/product/202203/545530/1000247266_front_XXL.jpg?imgname=%E0%B9%84%E0%B8%82%E0%B8%84%E0%B8%94%E0%B8%B5%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%84%E0%B8%99%E0%B8%B1%E0%B8%99%E0%B9%83%E0%B8%99-10-%E0%B8%99%E0%B8%B2%E0%B8%97%E0%B8%B5-%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%A1-3"
  }, {
    "id": 7,
    "bookname": "ผู้พิทักษ์แห่งนครสาบสูญ",
    "author": "Shannon Messenger",
    "type": "Fantasy",
    "imagelink": "https://storage.naiin.com/system/application/bookstore/resource/product/202209/559585/1000253752_front_XXL.jpg?imgname=%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%9E%E0%B8%B4%E0%B8%97%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B9%8C%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%8D"
  }, {
    "id": 8,
    "bookname": "สกันดาร์กับจอมโจรขโมยยูนิคอร์น",
    "author": "A.F. Steadman",
    "type": "Fantasy",
    "imagelink": "https://storage.naiin.com/system/application/bookstore/resource/product/202209/559492/1000253750_front_XXL.jpg?imgname=%E0%B8%AA%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%88%E0%B8%AD%E0%B8%A1%E0%B9%82%E0%B8%88%E0%B8%A3%E0%B8%82%E0%B9%82%E0%B8%A1%E0%B8%A2%E0%B8%A2%E0%B8%B9%E0%B8%99%E0%B8%B4%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%99"
  }, {
    "id": 9,
    "bookname": "นายวายร้ายกับพินัยกรรมป่วนรัก",
    "author": "เปลแก้ว",
    "type": "Romance",
    "imagelink": "https://storage.naiin.com/system/application/bookstore/resource/product/201307/119278/6000005264_front_XXL.jpg?imgname=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%9E%E0%B8%B4%E0%B8%99%E0%B8%B1%E0%B8%A2%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%9B%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%81"
  }, {
    "id": 10,
    "bookname": "ข้ามฟ้ามาภพรัก",
    "author": "กรแก้ว",
    "type": "Romance",
    "imagelink": "https://storage.naiin.com/system/application/bookstore/resource/product/202205/548056/6000060395_front_XXL.jpg?imgname=%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%A0%E0%B8%9E%E0%B8%A3%E0%B8%B1%E0%B8%81"
  }]`);

const datamusic = JSON.parse(`[{
    "id": 1,
    "songname": "Cheers",
    "artist": "Seventeen",
    "type": "Kpop",
    "imagelink": "https://f.ptcdn.info/766/077/000/rei4ouwxcyGGjc9eay6a-o.jpg"
  }, {
    "id": 2,
    "songname": "Love Dive",
    "artist": "IVE",
    "type": "Kpop",
    "imagelink": "https://laz-img-sg.alicdn.com/p/8736b7a92188d17459280fc2170bb0ce.jpg"
  }, {
    "id": 3,
    "songname": "Mr. Everything",
    "artist": "Billkin",
    "type": "Pop",
    "imagelink": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgN6Ng53KuqrS2W123AGVY_mOOOTVcLzHUCFnzjx0cHoXdTTCsfSMj9DXSTdTEvYvfUhw7AN2YBFaumteTZiDtdcYIf_mep5XnbQgS818gxTd8kx11PH5cViWb6s9D3jvI5hQtU_jI5LUQv5ji7XlHFCuNQWM0pj09JYxyrMT0O9v3TPdivywc5v4L22w/s2048/Billkin%20-%20Mr.%20Everything.jpg"
  }, {
    "id": 4,
    "songname": "ที่ไม่รัก (Unnoticed)",
    "artist": "PROXIE",
    "type": "Pop",
    "imagelink": "https://images.genius.com/93b8175fd0000e6af436301674b31fae.1000x1000x1.jpg"
  }, {
    "id": 5,
    "songname": "ธาตุทองซาวด์",
    "artist": "Youngohm",
    "type": "HipHop",
    "imagelink": "https://i.scdn.co/image/ab67616d0000b27393ad90b97deda6e1c3b83bc7"
  }, {
    "id": 6,
    "songname": "รักนะเว้ย",
    "artist": "มิลลิ",
    "type": "HipHop",
    "imagelink": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgotCxwA87Lu3PkOCbnbi0HM51qncQrPvuExKa3pbxc4MJxr3IftMY33zrvGimkRy1bxWaQj4s_OjXS9NEx_5xmUpiNTIbKaCCDHd7NZRff0_0BPIsTT_YUQ7IrgUXuV4JkUoh_hxPCA_m9X1GThrESg-olyDKoDbsaIEolXi8iq27onJP24amJLe4t7A/w1200-h630-p-k-no-nu/MILLI%20feat.%20NAMEMT%20-%20RAK%20NA%20WOEI.jpg"
  }, {
    "id": 7,
    "songname": "เลี้ยงส่ง",
    "artist": "โซคูล",
    "type": "Rock",
    "imagelink": "https://s.isanook.com/jo/0/rp/r/w700/ya0xa0m1w0/aHR0cDovL2ltZ2NhY2hlLmpvb3guY29tL211c2ljL2pvb3gvcGhvdG8vbWlkX2FsYnVtXzY0MC9kLzAvZDVkMjNmNmQ3NDE2ZDdkMC5qcGc=.jpg"
  }, {
    "id": 8,
    "songname": "Starman",
    "artist": "David Bowie",
    "type": "Rock",
    "imagelink": "https://media.wnyc.org/i/800/0/c/85/1/david-bowie-001.jpg"
  }, {
    "id": 9,
    "songname": "Faded",
    "artist": "Alan Walker",
    "type": "EDM",
    "imagelink": "https://upload.wikimedia.org/wikipedia/en/d/da/Alan_Walker_-_Faded.png"
  }, {
    "id": 10,
    "songname": "Closer",
    "artist": "The Chainsmokers",
    "type": "EDM",
    "imagelink": "https://upload.wikimedia.org/wikipedia/th/a/a5/Closer_%28featuring_Halsey%29_%28Official_Single_Cover%29_by_The_Chainsmokers.png"
  }]`);

const datamovie = JSON.parse(`[{
    "id": 1,
    "moviename": "DUNE (2021)",
    "director": "Denis Villeneuve",
    "type": "Sci-Fi",
    "imagelink": "https://s359.kapook.com/rq/450/auto/50/pagebuilder/c3e3f46a-1ba3-4053-967e-4d4a420279f3.jpg"
  }, {
    "id": 2,
    "moviename": "THE ADAM PROJECT (2022)",
    "director": "Shawn Adam Levy",
    "type": "Sci-Fi",
    "imagelink": "https://assets.beartai.com/uploads/2022/03/cover-5.jpg"
  }, {
    "id": 3,
    "moviename": "The Sea Beast",
    "director": "Chris Williams",
    "type": "Comedy",
    "imagelink": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTnMsEbv_FSqysSH6CgBtyeGGDj0A4ELcUZLTIeFCUfbh0OobAM"
  }, {
    "id": 4,
    "moviename": "Minions (2015)",
    "director": "Pierre Coffin , Kyle Balda",
    "type": "Comedy",
    "imagelink": "https://upload.wikimedia.org/wikipedia/th/f/f8/Minions_Thai_poster.jpg"
  }, {
    "id": 5,
    "moviename": "Smile ยิ้มสยอง",
    "director": "Parker Finn",
    "type": "Horror",
    "imagelink": "https://cdni-hw.bugaboo.tv/dm/sz-md/i/images/2022/09/21/fdglwcjxkamxqj_1663736844_1446.jpg"
  }, {
    "id": 6,
    "moviename": "The Invitation",
    "director": "Jessica M. Thompson",
    "type": "Horror",
    "imagelink": "https://s359.kapook.com/rq/450/auto/50/pagebuilder/951fe84b-27f9-48ff-93e1-04f8f5402165.jpg"
  }, {
    "id": 7,
    "moviename": "The Tomorrow War",
    "director": "Chris McKay",
    "type": "Action",
    "imagelink": "https://upload.wikimedia.org/wikipedia/en/6/60/The_Tomorrow_War_%282021_film%29_official_theatrical_poster.jpg?20210528000608"
  }, {
    "id": 8,
    "moviename": "Top Gun: Maverick",
    "director": "Joseph Kosinski",
    "type": "Action",
    "imagelink": "https://lh3.googleusercontent.com/kf3DRgL_m21iQRs0HQvczIRb5nGyLTRNN9j9J8GZSoPgt0_O-8F1OYVKzFUKLqZHd8TWQxI-wcWZUAtQWhKaQLJ9h-TI1qiqNA=s0"
  }, {
    "id": 9,
    "moviename": "The Whale (2022)",
    "director": "Darren Aronofsky",
    "type": "Drama",
    "imagelink": "https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_FMjpg_UX1000_.jpg"
  }, {
    "id": 10,
    "moviename": "All Quiet on the Western Front",
    "director": "Edward Berger",
    "type": "Drama",
    "imagelink": "https://upload.wikimedia.org/wikipedia/en/c/c3/All_quiet_on_the_western_front_%282022_film%29.jpg"
  }]`);

const typebook = JSON.parse(`[
    {
        "typename": "Romance",
        "imgtype": "/resources/silky-heart 1.png"
    }, 
    {
        "typename": "Fantasy",
        "imgtype": "/resources/clip-1413.png"
    },
    {
        "typename": "Comics",
        "imgtype": "/resources/bonbon-flying-cartoon-rocket.png"
    },
    {
        "typename": "Mystery",
        "imgtype": "/resources/pale-magnifying-glass-1.png"
    },
    {
        "typename": "Self-Help",
        "imgtype": "/resources/shine-glowing-light-bulb.png"
    }
]`);

const typemusic = JSON.parse(`[
    {
        "typename": "Kpop",
        "imgtype": "/resources/142422622-k-pop-korean-popular-music-style-south-korea-flag-k-pop-hand-drawn-lettering-for-banner-print-removebg-preview.png"
    }, 
    {
        "typename": "Pop",
        "imgtype": "/resources/image 8.png"
    },
    {
        "typename": "HipHop",
        "imgtype": "/resources/unnamed-removebg-preview.png"
    },
    {
        "typename": "Rock",
        "imgtype": "/resources/image 9.png"
    },
    {
        "typename": "EDM",
        "imgtype": "/resources/image 11.png"
    }
]`);

const typemovie = JSON.parse(`[
    {
        "typename": "Sci-Fi",
        "imgtype": ""
    }, 
    {
        "typename": "Comedy",
        "imgtype": ""
    },
    {
        "typename": "Horror",
        "imgtype": ""
    },
    {
        "typename": "Action",
        "imgtype": ""
    },
    {
        "typename": "Drama",
        "imgtype": ""
    }
]`);

export {databook, datamovie, datamusic, typebook, typemusic, typemovie}
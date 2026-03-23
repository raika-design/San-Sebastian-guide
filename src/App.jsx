import { useState, useCallback } from "react";

const CATEGORIES = [
  { id: "fav", label: "お気に入り", icon: "❤️", color: "#D63B3B" },
  { id: "michelin", label: "ミシュラン", icon: "⭐", color: "#B8860B" },
  { id: "bar", label: "バル", icon: "🍷", color: "#A8111C" },
  { id: "cheesecake", label: "チーズケーキ", icon: "🧀", color: "#C47D2B" },
  { id: "cafe", label: "カフェ", icon: "☕", color: "#6B7B3A" },
  { id: "spot", label: "観光", icon: "📍", color: "#1B6B4A" },
  { id: "omiyage", label: "お土産", icon: "🎁", color: "#7B3F8D" },
];

const SPOTS = [
  // ★★★ 3-STAR
  { id:1, cat:"michelin", stars:3, name:"Arzak", sub:"アルサック", area:"市街地東部", price:"€195〜255",
    desc:"4世代続くバスク料理の革新的名門。フアン・マリ・アルサックと娘エレナが率い、日本人ゲストに圧倒的人気。予想外の食材の組み合わせとアートのような盛り付け。",
    jp:"日本人に最も知られた三つ星。創造的プレゼンテーションに感動する人多数。",
    tags:["要予約","テイスティングメニュー","革新的バスク"] },
  { id:2, cat:"michelin", stars:3, name:"Akelarre", sub:"アケラレ", area:"イゲルド山", price:"€180〜308",
    desc:"イゲルド山から海を見下ろす絶景レストラン。シェフのペドロ・スビハナが40年以上率いるバスク・ヌーベルキュイジーヌの殿堂。ホテル＆スパ併設。",
    jp:"鰹スープで味わう「旨味」作りなど和食テイストの一皿も。夕日を見ながらのディナーは格別。",
    tags:["要予約","絶景","オーベルジュ"] },
  { id:3, cat:"michelin", stars:3, name:"Martín Berasategui", sub:"マルティン・ベラサテギ", area:"ラサルテ（車15分）", price:"€250〜300",
    desc:"スペインで最も多くのミシュラン星を持つシェフ（12個）。軽やかで繊細、独創的なシグネチャー料理の数々。完璧なサービス。",
    jp:"繊細な味の重ね方が日本料理にも通じる。料理の芸術性に圧倒される。",
    tags:["要予約","郊外","12星シェフ"] },
  // ★★ 2-STAR
  { id:4, cat:"michelin", stars:2, name:"Mugaritz", sub:"ムガリッツ", area:"エレンテリア（車20分）", price:"€220〜280",
    desc:"世界のベストレストラン50常連。カトラリーなしで食べるスタイルなど五感を刺激するユニークな食事体験。田園に佇む隠れ家。",
    jp:"食に対する概念が変わる。好き嫌いは分かれるが冒険したい人向け。",
    tags:["要予約","実験的","ベストレストラン50"] },
  { id:5, cat:"michelin", stars:2, name:"Amelia", sub:"アメリア", area:"ラ・コンチャ湾沿い", price:"€200〜260",
    desc:"パウロ・アイラウド氏がバスク×イタリア×日本を融合。Hotel Villa Favorita内の親密な空間。ワインの90%がグラス対応。",
    jp:"日本の要素を取り入れた料理が多く、日本人の味覚に非常に合う。",
    tags:["要予約","日本の影響","親密空間"] },
  // ★ 1-STAR
  { id:6, cat:"michelin", stars:1, name:"Kokotxa", sub:"ココチャ", area:"旧市街", price:"€90〜130",
    desc:"旧市街にある一つ星。魚介中心のクリエイティブなバスク料理。カジュアルな雰囲気でランチメニューもあり、ミシュラン入門に最適。",
    jp:"星付きの中で最もアクセスしやすくコスパ◎。日本人初心者に一番おすすめ。",
    tags:["予約推奨","旧市街","魚介","コスパ良"] },
  { id:7, cat:"michelin", stars:1, name:"Elkano", sub:"エルカノ", area:"ゲタリア（バス約40分）", price:"€75〜120",
    desc:"港町ゲタリアの炭火焼き魚の聖地。ベストレストラン50で24位。カレイの丸焼きを部位ごとに味わう唯一無二の体験。",
    jp:"「魚食国民を自負していたのに衝撃を受けた」という日本人続出。",
    tags:["要予約","炭火焼き","魚介"] },
  { id:8, cat:"michelin", stars:1, name:"Mirador de Ulía", sub:"ミラドール・デ・ウリア", area:"ウリア山", price:"€140前後",
    desc:"ウリア山テラスからスリオラビーチを見下ろす絶景レストラン。ベジタリアンオプションあり。",
    jp:"景色と料理の両方を楽しめる特別な日のランチにぴったり。",
    tags:["予約推奨","絶景","ベジ対応"] },
  { id:9, cat:"michelin", stars:1, name:"Ama", sub:"アマ", area:"トロサ（車30分）", price:"€70〜100",
    desc:"兄弟シェフがその朝届いた食材だけで料理。グリーンスター取得のサステナブルレストラン。星付き最安クラス。",
    jp:"旬の食材をシンプルに活かす哲学が和食と通じる。コスパ最強の星付き。",
    tags:["要予約","サステナブル","コスパ良"] },
  { id:10, cat:"michelin", stars:1, name:"Itzuli", sub:"イツリ", area:"市内", price:"€100〜",
    desc:"2026年ミシュランガイドで新たに一つ星を獲得した新進気鋭。今後さらに注目度UP。",
    jp:"新星として今最も勢いがある。早めに行っておくべき。",
    tags:["予約推奨","新星","注目"] },
  // === BAR ===
  { id:20, cat:"bar", name:"Txepetxa", sub:"チェペチャ", area:"旧市街", price:"€3〜5/品",
    desc:"アンチョビだけで勝負する専門店。ウニ・蟹・タラコ・トリュフなど一つずつ違うトッピング。カウンター越しに職人が仕上げる。",
    jp:"「人生で食べたアンチョビの概念が変わった」。寿司屋の空気感と同じ。",
    tags:["アンチョビ専門","予約不要"] },
  { id:21, cat:"bar", name:"La Cuchara de San Telmo", sub:"ラ・クチャラ", area:"旧市街", price:"€3〜6/品",
    desc:"温かいピンチョスの天才。フォアグラのソテー、牛ほほ肉煮込み、タコのガリシア風。出汁的な旨味がすごい。",
    jp:"「ここのフォアグラ食べて泣きそうになった」はガチ。照り焼き的な味覚。",
    tags:["温製ピンチョス","フォアグラ"] },
  { id:22, cat:"bar", name:"Casa Urola", sub:"カサ・ウローラ", area:"旧市街", price:"ピンチョス€4〜 / レストラン€50〜80",
    desc:"1Fバル、2Fレストラン。旬の食材を最もシンプルに。キノコの炭火焼き＋粗塩だけ、卵の黄身の燻製が名物。",
    jp:"「素材をそのまま活かすって、これのことだ」。和食の哲学と完全一致。",
    tags:["旬の食材","1F バル / 2F レストラン"] },
  { id:23, cat:"bar", name:"Bar Sport", sub:"バル・スポルト", area:"旧市街", price:"€3〜6/品",
    desc:"見た目は地味、味は爆発。エビの鉄板焼き、タラのピルピル、フォアグラ、カニクレープ。日本語メニューあり。通し営業。",
    jp:"サンセバスティアンで最初に行くべきバル。日本人リピート率No.1。",
    tags:["日本語メニュー","通し営業","初心者◎"] },
  { id:24, cat:"bar", name:"Gandarias", sub:"ガンダリアス", area:"旧市街", price:"€4〜7/品",
    desc:"肉ピンチョスの王者。一口サイズの牛ヒレがパンの上にドン。焼き加減絶妙。蟹のオーブン焼きも人気。中休みなし。",
    jp:"ステーキ好き×一口サイズ好きをピンポイントで。ワインとの相性◎。",
    tags:["肉ピンチョス","中休みなし"] },
  { id:25, cat:"bar", name:"Borda Berri", sub:"ボルダ・ベッリ", area:"旧市街", price:"€4〜7/品",
    desc:"全品オーダー式で作りたて。豚あばら肉のケバブとクリームリゾットが二大名物。日本人ブログ頻出の超人気店。",
    jp:"「全部美味しい、小皿料理の最高峰」。何を注文してもほぼハズレなし。",
    tags:["オーダー式","リゾット","肉料理"] },
  { id:26, cat:"bar", name:"Ganbara", sub:"ガンバラ", area:"旧市街", price:"€8〜20/品",
    desc:"季節のキノコ盛り合わせソテーが超有名。カニのタルト「チャングーロ」も絶品。やや高級路線。開店前から行列。",
    jp:"きのこソテーは「これがキノコ？」と驚く美味しさ。",
    tags:["キノコ","蟹タルト","要早め来店"] },
  { id:27, cat:"bar", name:"Atari Gastroteka", sub:"アタリ", area:"旧市街", price:"€5〜10/品",
    desc:"今バスクで最も勢いのあるバルの一つ。教会が目の前のテラス席が最高。テーブル席は予約推奨。",
    jp:"テラスからの眺めが最高。雰囲気・味・サービスすべてハイレベル。",
    tags:["テラス席","予約推奨","モダン"] },
  { id:28, cat:"bar", name:"La Rampa", sub:"ラ・ランパ", area:"港エリア", price:"€10〜25",
    desc:"港の目の前で食べる魚介。イカのフライ（Rabas）と本日の焼き魚が名物。地元の漁師も来る。",
    jp:"海を見ながらシンプルな魚。日本人のDNAが反応する漁港メシ感。",
    tags:["港エリア","イカフライ","焼き魚"] },
  { id:29, cat:"bar", name:"Gorriti Taberna", sub:"ゴリティ", area:"旧市街（市場近く）", price:"€3〜8/品",
    desc:"市場近くの地元民バル。朝から営業。酢漬けイワシ×ベリーのピンチョスが意外性の傑作。",
    jp:"渋いマスターが一人でやっている。朝ごはん利用にも。",
    tags:["朝営業","地元民御用達","市場近く"] },
  { id:30, cat:"bar", name:"Casa Vallés", sub:"カサ・バジェス", area:"旧市街近く", price:"€8〜18",
    desc:"バカラオ（塩ダラ）料理の名店。ピルピル（乳化ソース）のトロッとした食感があんかけ的。",
    jp:"干物文化に通じる旨味凝縮。「タラがこんなに美味しいとは」。",
    tags:["塩ダラ","ピルピル"] },
  { id:31, cat:"bar", name:"Zumeltzegi", sub:"ズメルツェギ", area:"旧市街", price:"€3〜7/品",
    desc:"アンコウの串焼きが名物。比較的空いていて落ち着いて食べられる穴場バル。",
    jp:"混雑が苦手な人のオアシス。",
    tags:["串焼き","穴場","落ち着く"] },
  { id:32, cat:"bar", name:"Bergara", sub:"ベルガラ", area:"グロス地区", price:"€3〜8/品",
    desc:"旧市街から離れたグロス地区の創作ピンチョスバル。美しい見た目と意外性。",
    jp:"旧市街の喧騒を抜けて一味違うピンチョス体験を。",
    tags:["創作","穴場","グロス地区"] },
  { id:33, cat:"bar", name:"Bodega Donostiarra", sub:"ボデガ・ドノスティアッラ", area:"旧市街", price:"€3〜8/品",
    desc:"バスクの伝統料理が味わえる地元民御用達店。観光客が少なく穴場。",
    jp:"ローカル感で伝統バスク料理を楽しめる。",
    tags:["伝統料理","穴場","地元民"] },
  { id:34, cat:"bar", name:"La Cepa", sub:"ラ・セパ", area:"旧市街外れ", price:"€5〜15",
    desc:"落ち着いた客層で居心地◎。イベリコ生ハムとアサリのリゾットが名物。バル巡りの休憩にも。",
    jp:"ムール貝のディアブロ風も美味。ゆっくり座りたい時に。",
    tags:["生ハム","リゾット","落ち着く"] },
  { id:35, cat:"bar", name:"Sidrería Petritegi", sub:"シドレリア・ペトリテギ", area:"アスティガラガ（バス20分）", price:"€30〜50",
    desc:"チュレトン（骨付き熟成ステーキ）で絶句。赤身肉の味の濃さに「これが肉本来の味か」と目覚める。シードラ飲み放題。",
    jp:"和牛とは違うベクトルの美味しさ。外は炭の香り、中はジューシー。",
    tags:["シードラ","骨付きステーキ","バス20分"] },
  // === CHEESECAKE ===
  { id:50, cat:"cheesecake", name:"La Viña", sub:"ラ・ビーニャ — 元祖バスチー", area:"旧市街", price:"1カット €5前後",
    desc:"バスクチーズケーキ発祥の店。中のトロトロ具合がコンビニのバスチーとは完全に別次元。ホール販売もあり。テイクアウトOK。",
    jp:"日本人が世界一愛するチーズケーキの聖地。地元は「まあ美味しいデザートだよね」くらいの温度感😂",
    tags:["元祖バスチー","テイクアウト可","ホール販売"] },
  { id:51, cat:"cheesecake", name:"The Loaf", sub:"ザ・ローフ — さっぱり系", area:"市内", price:"€5〜8",
    desc:"La Viña以外でバスクチーズケーキを食べ比べるなら。さっぱり系の味わいが特徴。落ち着いた店内でゆっくり。",
    jp:"La Viñaの濃厚さと対照的。こっちの方が好きという人も多い。",
    tags:["さっぱり系","食べ比べ","店内飲食"] },
  { id:52, cat:"cheesecake", name:"La Viña del Ensanche", sub:"ラ・ビーニャ・デル・エンサンチェ — 系列店", area:"新市街", price:"€5〜7",
    desc:"本家La Viñaの系列店。新市街にあり旧市街より落ち着いた環境で同系統の味。ワインセレクションも充実。",
    jp:"旧市街の混雑を避けたい人向け。ワインと合わせて大人な楽しみ方。",
    tags:["系列店","新市街","ワイン"] },
  { id:53, cat:"cheesecake", name:"Gelateria Boulevard", sub:"ジェラテリア・ブルバール — ジェラート版", area:"コンチャ海岸沿い", price:"€4〜6",
    desc:"ジェラート店だがバスクチーズケーキ味が名物。海岸沿いの散歩のお供に最適。",
    jp:"チーズケーキをジェラートで楽しむ新体験。食べ歩きに◎。",
    tags:["ジェラート","食べ歩き","海岸沿い"] },
  // === CAFE ===
  { id:60, cat:"cafe", name:"Santa Lucia", sub:"サンタ・ルシア", area:"旧市街", price:"€5〜10",
    desc:"朝8時半から営業。朝の始動が遅いスペインで貴重な早朝カフェ。メニュー豊富でリーズナブル。月〜日営業。",
    jp:"朝ごはん難民になりがちなスペイン旅で救世主。",
    tags:["朝食","8:30〜営業"] },
  { id:61, cat:"cafe", name:"Old Town Coffee", sub:"オールドタウンコーヒー", area:"バス停近く", price:"€5〜12",
    desc:"アサイーボウルなどヘルシーメニュー充実。バル巡りで疲れた胃に優しい。",
    jp:"バル巡りの合間のリセットに最適。",
    tags:["ヘルシー","アサイー"] },
  { id:62, cat:"cafe", name:"Urgull Kafe", sub:"ウルグル・カフェ", area:"旧市街", price:"€5〜10",
    desc:"トッピングを自分で選べるトースト。アボカド＋クリームチーズ＋オリーブオイルの組み合わせが好評。",
    jp:"出発日の朝に訪れる人多数。シンプルだからこそ美味しい。",
    tags:["トースト","朝食向き"] },
  { id:63, cat:"cafe", name:"Nalu Poke", sub:"ナル・ポケ", area:"市内", price:"€10〜14",
    desc:"自分好みにカスタマイズできるポケ専門店。彩り豊かで野菜たっぷり。アサイーボウルも。",
    jp:"ピンチョス漬けの胃をリセット。ポケ専門店でもなかなかない美味しさ。",
    tags:["ポケ","ヘルシー","野菜"] },
  // === SIGHTSEEING ===
  { id:70, cat:"spot", name:"ラ・コンチャ海岸", sub:"Playa de la Concha", area:"市中心部", price:"無料",
    desc:"「ヨーロッパで最も美しい都市海岸」と称される約2kmのビーチ。貝殻のような弧を描く砂浜。遊歩道が整備。",
    jp:"旧市街から徒歩10分。夕方のゴールデンアワーが最も美しい。夕日は必見。",
    tags:["ビーチ","夕日","散歩"] },
  { id:71, cat:"spot", name:"モンテ・イゲルド", sub:"Monte Igueldo 🚡 フニクラーレで山頂へ", area:"市西部", price:"フニクラーレ往復 €4.75",
    desc:"サンセバスティアンNo.1の展望スポット。1912年開業のフニクラーレ（Funicular＝レトロな木製ケーブルカー）で山頂へ。ラ・コンチャ湾の絶景パノラマ。山頂にはレトロ遊園地も。三つ星Akelarreもこの山に。",
    jp:"「サンセバスティアンに来て良かった」と思える景色。フニクラーレに乗るだけでワクワク。遊園地の駅舎も可愛い。",
    tags:["🚡 フニクラーレ","絶景","展望台","レトロ遊園地"] },
  { id:72, cat:"spot", name:"モンテ・ウルグル", sub:"Monte Urgull", area:"旧市街裏", price:"無料",
    desc:"旧市街の背後にある丘。徒歩20〜30分で頂上へ。要塞跡とキリスト像、街と海のパノラマ。",
    jp:"無料で登れて運動にもなる。朝のバル巡り前にちょうどいい。",
    tags:["ハイキング","無料","要塞跡"] },
  { id:73, cat:"spot", name:"旧市街", sub:"Parte Vieja", area:"市中心部", price:"無料",
    desc:"バル100軒以上が密集。コンスティトゥシオン広場（元闘牛場でバルコニーに番号が残る）、サン・ビセンテ教会、サンタ・マリア教会。",
    jp:"食べ歩きしながら自然と観光もできる。石畳の路地はどこを切り取っても絵になる。",
    tags:["街歩き","教会","広場"] },
  { id:74, cat:"spot", name:"ペイネ・デ・ロス・ビエントス（風の櫛）", sub:"Peine del Viento — チリーダの彫刻", area:"市西端（オンダレタ海岸）", price:"無料",
    desc:"サンセバスティアン出身の世界的彫刻家エドゥアルド・チリーダの代表作。過去・現在・未来を表す3つの鉄のオブジェが岩場に設置。満潮時には足元のテラスから潮が勢いよく噴き出す。",
    jp:"アートと自然の融合に感動。波が高い日・風が強い日ほどダイナミック。コンチャ海岸から海沿いを歩いて行ける。",
    tags:["アート","チリーダ","彫刻","海辺"] },
  { id:75, cat:"spot", name:"サン・テルモ美術館", sub:"San Telmo Museoa", area:"旧市街", price:"€10（火曜無料あり）",
    desc:"16世紀のドミニコ会修道院を改装。バスク地方の歴史・文化・美術を古代から現代まで展示。建物自体が美しい。",
    jp:"バスク文化を深く知りたい人に。雨の日の観光にも◎。",
    tags:["美術館","バスク文化","雨天OK"] },
  { id:76, cat:"spot", name:"サンセバスティアン港", sub:"Puerto", area:"旧市街東", price:"無料",
    desc:"観光船や漁船が停泊する港。視界が開けて爽快な散歩スポット。水族館もあり。夏季はクルーズ船も。",
    jp:"港町の空気を感じられる。パン屋やお菓子屋もあって楽しい。",
    tags:["港","散歩","水族館"] },
  { id:78, cat:"spot", name:"ミラマール宮殿", sub:"Palacio de Miramar — 外観観光", area:"ラ・コンチャ湾中央の高台", price:"庭園 無料",
    desc:"19世紀末にスペイン王室の夏の離宮として建てられたイギリス様式の宮殿。建物内部は非公開だが美しい庭園は自由に散策可能。ラ・コンチャ湾を一望できる。",
    jp:"宮殿の外観と庭園だけでも十分見ごたえあり。ベンチに座って海を眺める贅沢な時間。コンチャ海岸の散歩ルートに組み込むと◎。",
    tags:["宮殿","庭園","外観観光","無料"] },
  { id:79, cat:"spot", name:"ブエン・パストール大聖堂", sub:"Catedral del Buen Pastor — 入場見学", area:"新市街中心", price:"無料",
    desc:"1897年完成のネオゴシック様式の大聖堂でサンセバスティアン最大の宗教建築。高さ75mの尖塔は街のランドマーク。内部のステンドグラスと高い天井アーチが圧巻。",
    jp:"ステンドグラスの美しさは一見の価値あり。新市街のショッピングエリアにも近い。",
    tags:["大聖堂","ネオゴシック","入場無料","ステンドグラス"] },
  { id:77, cat:"spot", name:"ラ・ブレチャ市場", sub:"Mercado de la Bretxa", area:"旧市街入口", price:"無料",
    desc:"地元の食材が並ぶ市場。チーズ、チョリソ、オリーブオイル、チャコリなどバスクの美味が凝縮。お土産探しにも◎。",
    jp:"バスクの食文化を肌で感じられる。見ているだけでテンション上がる。",
    tags:["市場","お土産","食材"] },
  // === お土産 ===
  { id:80, cat:"omiyage", name:"アンチョビ（缶詰・瓶詰）", sub:"Anchoas del Cantábrico", area:"ラ・ブレチャ市場 / ゲタリア", price:"€8〜20",
    desc:"バスク・カンタブリア海産のアンチョビは日本のものとは別次元。特にゲタリアのMAISOR社製は出来立てで概念が変わる。",
    jp:"缶詰なので持ち帰りやすい。パスタやサラダに載せるだけでバスクの味に。",
    tags:["食品","日持ち◎","定番"] },
  { id:81, cat:"omiyage", name:"イディアサバルチーズ", sub:"Queso Idiazábal", area:"ラ・ブレチャ市場", price:"€10〜25",
    desc:"バスク地方の名物羊チーズ。燻製タイプは特に濃厚でナッツのような風味。真空パックで持ち帰り可能。",
    jp:"ワインやビールのお供に最高。燻製タイプが日本人に特に人気。",
    tags:["チーズ","羊乳","燻製"] },
  { id:82, cat:"omiyage", name:"チャコリワイン", sub:"Txakoli", area:"市内各所 / ワイナリー", price:"€8〜15",
    desc:"バスク固有の微発泡白ワイン。軽くてフレッシュ、酸味が心地よい。瓶が軽めで持ち帰りやすい。",
    jp:"バルで飲んで感動した味を家でも。高い位置から注ぐパフォーマンスも思い出に。",
    tags:["ワイン","微発泡","軽い"] },
  { id:83, cat:"omiyage", name:"エスプレット唐辛子", sub:"Piment d'Espelette", area:"市場 / 専門店", price:"€5〜12",
    desc:"フレンチバスク産の甘い辛さの唐辛子パウダー。料理のアクセントに万能。赤いパッケージが可愛い。",
    jp:"辛すぎず風味が良い。帰国後の料理が一気にバスク風になる魔法のスパイス。",
    tags:["スパイス","フレンチバスク","万能"] },
  { id:84, cat:"omiyage", name:"バスクのオリーブオイル", sub:"Aceite de Oliva", area:"ラ・ブレチャ市場 / Elkano", price:"€8〜18",
    desc:"バスク産の上質なオリーブオイル。Elkanoオリジナル（€8程度）はパッケージも可愛くお土産に最適。",
    jp:"パンにつけるだけで幸せ。Elkanoのは特に人気。",
    tags:["オリーブオイル","Elkano","料理用"] },
  { id:85, cat:"omiyage", name:"チョリソ＆サルチチョン", sub:"Chorizo / Salchichón", area:"ラ・ブレチャ市場", price:"€5〜15",
    desc:"バスク産の生ハムやソーセージ類。真空パックなら持ち帰り可能。ワインのお供に。",
    jp:"市場で試食させてくれることも。好みの味を見つけて。",
    tags:["生ハム","ソーセージ","真空パック"] },
  { id:86, cat:"omiyage", name:"パンチネータ", sub:"Pantxineta — バスク伝統菓子", area:"パン屋 / 菓子店", price:"€3〜8",
    desc:"アーモンドクリーム入りのバスク伝統パイ菓子。サクサクのパイ生地にたっぷりのアーモンドクリーム、表面にスライスアーモンド。",
    jp:"バスチーに次ぐバスクスイーツ。素朴だけど上品な甘さがクセになる。",
    tags:["伝統菓子","アーモンド","パイ"] },
  { id:87, cat:"omiyage", name:"バスクリネン", sub:"Linge Basque — 伝統織物", area:"旧市街の雑貨店", price:"€15〜50",
    desc:"バスク地方伝統のストライプ柄テーブルクロス、エプロン、ティータオルなど。赤・緑・青のストライプが特徴的。",
    jp:"キッチンに置くだけでバスクの雰囲気。実用的で喜ばれるお土産。",
    tags:["テキスタイル","伝統柄","実用的"] },
  { id:88, cat:"omiyage", name:"バスクベレー帽", sub:"Txapela", area:"旧市街の帽子店", price:"€20〜50",
    desc:"バスク文化の象徴ベレー帽。地元では今でも年配の方がかぶっている。ウール製で品質高い。",
    jp:"被るだけでバスク気分。ファッションアイテムとしても◎。",
    tags:["帽子","伝統文化","ウール"] },
  { id:89, cat:"omiyage", name:"エスパドリーユ", sub:"Espadrilles — バスク伝統サンダル", area:"旧市街の靴店", price:"€15〜40",
    desc:"ジュート（麻）ソールにキャンバス地のバスク伝統サンダル。夏の定番。カラフルなデザイン豊富。",
    jp:"軽くて履き心地◎。自分用にも。",
    tags:["サンダル","伝統","夏向き"] },
  { id:90, cat:"omiyage", name:"チリーダのアートグッズ", sub:"Eduardo Chillida グッズ", area:"サン・テルモ美術館", price:"€5〜30",
    desc:"世界的彫刻家チリーダのポストカード、ポスター、書籍、小物。「風の櫛」ミニチュアも。ミュージアムショップで。",
    jp:"「風の櫛」を見た後に。アート好きへのお土産に最適。",
    tags:["アート","彫刻家","ミュージアムショップ"] },
  { id:91, cat:"omiyage", name:"Xibaritak Gandarias", sub:"シバリターク・ガンダリアス", area:"旧市街", price:"€5〜30",
    desc:"人気バルGandarias直営のグルメ土産ショップ。バスクの食材、調味料、ワイン、缶詰などセレクト品が揃う。",
    jp:"バルで感動した味をそのまま持ち帰れる。ギフト包装も対応。",
    tags:["専門店","セレクト","ギフト対応"] },
  { id:92, cat:"omiyage", name:"Lukas", sub:"ホテル マリア・クリスティーナ内ショップ", area:"市中心部", price:"€5〜25",
    desc:"ラグジュアリーホテル内の土産ショップ。バスクのチョコレート、お菓子、雑貨などセンスの良い品揃え。宿泊者以外も入店可。",
    jp:"上品なパッケージで目上の方へのお土産にも安心。",
    tags:["ホテル内","チョコ","上品"] },
];

/* ─── components ─── */

function StarBadge({ count }) {
  if (!count) return null;
  const bg = count===3?"#A8111C":count===2?"#C0392B":"#D35400";
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:1, background:bg,
      color:"#fff", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:10, letterSpacing:1 }}>
      {"★".repeat(count)}
    </span>
  );
}

function FavBtn({ active, onClick }) {
  return (
    <button onClick={e => { e.stopPropagation(); onClick(); }} style={{
      background:"none", border:"none", cursor:"pointer", fontSize:18, padding:4,
      transition:"transform .2s", transform: active?"scale(1.2)":"scale(1)",
      filter: active?"none":"grayscale(1) opacity(0.3)" }}
      title={active?"お気に入りから外す":"お気に入りに追加"}>
      {active ? "❤️" : "🤍"}
    </button>
  );
}

function Modal({ spot, onClose, isFav, toggleFav }) {
  const cat = CATEGORIES.find(c => c.id === spot.cat);
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(10,20,15,0.55)",
      backdropFilter:"blur(8px)", display:"flex", alignItems:"center",
      justifyContent:"center", zIndex:1000, padding:16, animation:"fadeIn .2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"#FCFCFA", borderRadius:20, padding:"28px 24px 24px",
        maxWidth:480, width:"100%", maxHeight:"84vh", overflowY:"auto",
        boxShadow:"0 20px 60px rgba(0,0,0,0.3)", position:"relative",
        border:"1px solid #D6E0D4", animation:"slideUp .25s ease" }}>

        <div style={{ position:"absolute", top:14, right:16, display:"flex", alignItems:"center", gap:4 }}>
          <FavBtn active={isFav} onClick={toggleFav} />
          <button onClick={onClose} style={{
            background:"none", border:"none", fontSize:20, cursor:"pointer",
            color:"#AAA", lineHeight:1 }}>✕</button>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, flexWrap:"wrap" }}>
          <span style={{ fontSize:11, color:cat.color, fontWeight:700, letterSpacing:1 }}>
            {cat.icon} {cat.label}
          </span>
          <StarBadge count={spot.stars} />
        </div>

        <h2 style={{ fontFamily:"'Playfair Display','Noto Serif JP',serif",
          fontSize:24, fontWeight:800, color:"#1A2E1A", margin:"0 0 2px", lineHeight:1.3 }}>
          {spot.name}
        </h2>
        <div style={{ fontSize:13, color:"#777", marginBottom:16 }}>{spot.sub}</div>

        <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap", fontSize:12, color:"#666" }}>
          <span>📍 {spot.area}</span>
          <span>💰 {spot.price}</span>
        </div>

        <div style={{ background:"#F0F5EE", borderRadius:12, padding:16, marginBottom:16 }}>
          <p style={{ fontSize:14, color:"#2A3A2A", lineHeight:1.9, margin:0 }}>{spot.desc}</p>
        </div>

        <div style={{ background:"#FFF5F5", border:"1px solid #F0D0D0", borderRadius:12, padding:"14px 16px", marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#A8111C", marginBottom:4, letterSpacing:1 }}>🇯🇵 日本人の声</div>
          <p style={{ fontSize:13, color:"#5A3030", lineHeight:1.8, margin:0 }}>{spot.jp}</p>
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {spot.tags.map(t => (
            <span key={t} style={{ background:`${cat.color}10`, color:cat.color,
              fontSize:11, padding:"4px 10px", borderRadius:14, fontWeight:500,
              border:`1px solid ${cat.color}20` }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── main ─── */
export default function App() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [favs, setFavs] = useState(new Set());

  const toggleFav = useCallback((id) => {
    setFavs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const displayCats = CATEGORIES.filter(c => c.id !== "fav");

  const filtered = SPOTS.filter(s => {
    const matchCat = activeCat==="all" ? true
      : activeCat==="fav" ? favs.has(s.id)
      : s.cat===activeCat;
    if (!search) return matchCat;
    const q = search.toLowerCase();
    return matchCat && (
      s.name.toLowerCase().includes(q) || (s.sub||"").toLowerCase().includes(q) ||
      s.desc.includes(q) || s.jp.includes(q) || s.area.includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  const grouped = activeCat==="all"
    ? displayCats.map(cat => ({
        label: `${cat.icon} ${cat.label}`,
        color: cat.color,
        items: filtered.filter(s=>s.cat===cat.id)
      })).filter(g=>g.items.length>0)
    : [{ label:null, color:null, items:filtered }];

  const favCount = favs.size;

  return (
    <div style={{ minHeight:"100vh", background:"#F4F7F2",
      fontFamily:"'Noto Sans JP','Helvetica Neue',sans-serif" }}>

      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Noto+Sans+JP:wght@300;400;500;700&family=Cormorant+Garamond:wght@400;600&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#B0C4A8;border-radius:3px}
      `}</style>

      {/* HERO — Basque flag inspired: red bg, green accent, white text */}
      <div style={{ padding:"44px 20px 32px", textAlign:"center", position:"relative", overflow:"hidden",
        background:"linear-gradient(160deg, #A8111C 0%, #8B0E17 60%, #6B0A12 100%)" }}>
        <div style={{ position:"absolute", inset:0, opacity:0.08,
          backgroundImage:"repeating-linear-gradient(135deg,#fff 0px,#fff 1px,transparent 1px,transparent 16px)" }} />
        {/* Green accent bar */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:4,
          background:"linear-gradient(90deg, #1B6B4A, #2E8B57, #1B6B4A)" }} />

        <div style={{ fontSize:10, letterSpacing:6, color:"rgba(255,255,255,0.7)", fontWeight:600,
          textTransform:"uppercase", marginBottom:10, position:"relative" }}>
          Donostia — San Sebastián
        </div>
        <h1 style={{ fontFamily:"'Playfair Display','Noto Serif JP',serif",
          fontSize:32, fontWeight:900, color:"#fff", margin:"0 0 6px", lineHeight:1.2, position:"relative" }}>
          サンセバスティアン
        </h1>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"rgba(255,255,255,0.8)",
          fontWeight:400, letterSpacing:3, margin:0, position:"relative" }}>
          美食と絶景の完全ガイド
        </p>
        <div style={{ width:40, height:2,
          background:"linear-gradient(90deg,transparent,#2E8B57,transparent)",
          margin:"16px auto 0", position:"relative" }} />
        <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:16, flexWrap:"wrap", position:"relative" }}>
          {displayCats.map(c => (
            <span key={c.id} style={{ fontSize:10, color:"rgba(255,255,255,0.65)" }}>
              {c.icon}{SPOTS.filter(s=>s.cat===c.id).length}
            </span>
          ))}
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.5)" }}>計{SPOTS.length}スポット</span>
        </div>
      </div>

      {/* SEARCH */}
      <div style={{ padding:"16px 16px 8px", maxWidth:560, margin:"0 auto" }}>
        <div style={{ background:"#fff", borderRadius:12, padding:"10px 16px",
          boxShadow:"0 2px 12px rgba(0,0,0,0.05)", display:"flex", alignItems:"center",
          gap:10, border:"1px solid #D6E0D4" }}>
          <span style={{ fontSize:15, opacity:0.35 }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="店名・エリア・キーワードで検索..."
            style={{ border:"none", outline:"none", flex:1, fontSize:13,
              background:"transparent", color:"#333",
              fontFamily:"'Noto Sans JP',sans-serif" }} />
          {search && <button onClick={()=>setSearch("")} style={{
            border:"none", background:"none", cursor:"pointer", fontSize:13, color:"#999", padding:0 }}>✕</button>}
        </div>
      </div>

      {/* TABS */}
      <div style={{ padding:"8px 16px 14px", maxWidth:560, margin:"0 auto",
        display:"flex", gap:6, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
        {/* All */}
        <button onClick={()=>setActiveCat("all")} style={{
          padding:"7px 14px", borderRadius:20, border:"1.5px solid",
          borderColor:activeCat==="all"?"#1B6B4A":"#C8D4C4",
          background:activeCat==="all"?"#1B6B4A":"#fff",
          color:activeCat==="all"?"#fff":"#555",
          fontSize:11, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap",
          transition:"all .2s", fontFamily:"'Noto Sans JP',sans-serif" }}>
          🗺 すべて
        </button>
        {/* Fav */}
        <button onClick={()=>setActiveCat("fav")} style={{
          padding:"7px 14px", borderRadius:20, border:"1.5px solid",
          borderColor:activeCat==="fav"?"#D63B3B":"#C8D4C4",
          background:activeCat==="fav"?"#D63B3B":"#fff",
          color:activeCat==="fav"?"#fff":"#555",
          fontSize:11, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap",
          transition:"all .2s", fontFamily:"'Noto Sans JP',sans-serif" }}>
          ❤️ お気に入り{favCount>0?` (${favCount})`:""}
        </button>
        {/* Category tabs */}
        {displayCats.map(cat => {
          const on = activeCat === cat.id;
          return (
            <button key={cat.id} onClick={()=>setActiveCat(cat.id)} style={{
              padding:"7px 14px", borderRadius:20, border:"1.5px solid",
              borderColor:on?cat.color:"#C8D4C4", background:on?cat.color:"#fff",
              color:on?"#fff":"#555", fontSize:11, fontWeight:600, cursor:"pointer",
              whiteSpace:"nowrap", transition:"all .2s",
              fontFamily:"'Noto Sans JP',sans-serif" }}>
              {cat.icon} {cat.label}
            </button>
          );
        })}
      </div>

      {/* LIST */}
      <div style={{ padding:"0 16px 40px", maxWidth:560, margin:"0 auto" }}>
        {activeCat==="fav" && favCount===0 && (
          <div style={{ textAlign:"center", padding:"48px 20px", color:"#999", fontSize:13, lineHeight:1.8 }}>
            ❤️ お気に入りはまだありません<br/>
            各カードの 🤍 をタップして追加しましょう
          </div>
        )}
        {grouped.map((g, gi) => (
          <div key={gi}>
            {g.label && (
              <div style={{ fontSize:13, fontWeight:700, color:"#1B6B4A",
                padding:"18px 0 10px", letterSpacing:0.5,
                fontFamily:"'Noto Sans JP',sans-serif",
                borderBottom:"1px solid #D0DCC8", marginBottom:10 }}>
                {g.label}
                <span style={{ fontWeight:400, color:"#AAA", marginLeft:8, fontSize:11 }}>
                  {g.items.length}件
                </span>
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {g.items.map((spot, i) => {
                const cat = CATEGORIES.find(c=>c.id===spot.cat);
                const isFav = favs.has(spot.id);
                return (
                  <div key={spot.id} onClick={()=>setSelected(spot)} style={{
                    background:"#fff", borderRadius:14, padding:"14px 16px",
                    cursor:"pointer", boxShadow:"0 1px 8px rgba(0,0,0,0.04)",
                    border: isFav ? "1.5px solid #E8A0A0" : "1px solid #DEE8DA",
                    transition:"all .2s",
                    animation:`slideUp .3s ease ${i*0.03}s both`,
                    position:"relative", overflow:"hidden" }}
                    onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.07)";e.currentTarget.style.transform="translateY(-2px)"}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 8px rgba(0,0,0,0.04)";e.currentTarget.style.transform="translateY(0)"}}>
                    {/* Left accent */}
                    <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%",
                      background:cat.color, borderRadius:"14px 0 0 14px" }} />
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
                          {activeCat==="all" || activeCat==="fav" ? null :
                            <span style={{ fontSize:10, color:cat.color, fontWeight:600 }}>{cat.icon}</span>}
                          {activeCat==="fav" &&
                            <span style={{ fontSize:10, color:cat.color, fontWeight:600 }}>{cat.icon} {cat.label}</span>}
                          <StarBadge count={spot.stars} />
                        </div>
                        <h3 style={{ fontFamily:"'Playfair Display','Noto Serif JP',serif",
                          fontSize:15, fontWeight:700, color:"#1A2E1A",
                          margin:"0 0 2px", lineHeight:1.3 }}>{spot.name}</h3>
                        <div style={{ fontSize:11, color:"#999", marginBottom:5 }}>{spot.sub}</div>
                        <div style={{ display:"flex", gap:10, fontSize:10.5, color:"#888", flexWrap:"wrap" }}>
                          <span>📍 {spot.area}</span><span>💰 {spot.price}</span>
                        </div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, marginLeft:6, flexShrink:0 }}>
                        <FavBtn active={isFav} onClick={()=>toggleFav(spot.id)} />
                        <div style={{ fontSize:16, color:"#D0D8CC" }}>›</div>
                      </div>
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginTop:8 }}>
                      {spot.tags.slice(0,3).map(t => (
                        <span key={t} style={{ background:`${cat.color}0C`, color:`${cat.color}CC`,
                          fontSize:9.5, padding:"2px 8px", borderRadius:10, fontWeight:500 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length===0 && activeCat!=="fav" && (
          <div style={{ textAlign:"center", padding:"48px 20px", color:"#999", fontSize:14 }}>
            該当するスポットが見つかりませんでした
          </div>
        )}
      </div>

      {/* TIPS */}
      <div style={{ maxWidth:560, margin:"0 auto", padding:"0 16px 32px" }}>
        <div style={{ background:"linear-gradient(135deg, #1B3A2A 0%, #1B4A30 100%)",
          borderRadius:16, padding:"22px 20px", color:"#C4D8BC" }}>
          <div style={{ fontSize:11, color:"#7BC67B", fontWeight:700, letterSpacing:2, marginBottom:10 }}>
            💡 旅のヒント
          </div>
          <div style={{ fontSize:12, lineHeight:2.1 }}>
            🕐 食事はランチ14時〜 / ディナー20時〜<br/>
            🥂 最初の一杯はチャコリがおすすめ<br/>
            🍽 バルでは1〜2品で次の店へハシゴ<br/>
            👋 入店時「Ola!（オラ）」が挨拶マナー<br/>
            📅 日曜はバル定休多し<br/>
            ⭐ ミシュラン星付きは数ヶ月前に予約必須<br/>
            🚡 イゲルドはフニクラーレ（ケーブルカー）で山頂へ
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign:"center", padding:"20px 16px 28px", fontSize:10, color:"#999",
        lineHeight:1.8, borderTop:"1px solid #D0DCC8" }}>
        <div style={{ display:"flex", justifyContent:"center", gap:4, marginBottom:6 }}>
          <span style={{ display:"inline-block", width:20, height:3, borderRadius:2, background:"#A8111C" }} />
          <span style={{ display:"inline-block", width:20, height:3, borderRadius:2, background:"#fff", border:"1px solid #ddd" }} />
          <span style={{ display:"inline-block", width:20, height:3, borderRadius:2, background:"#1B6B4A" }} />
        </div>
        <div style={{ letterSpacing:3, fontSize:9, fontWeight:600, marginBottom:2, color:"#1B6B4A" }}>
          DONOSTIA — SAN SEBASTIÁN
        </div>
        ミシュラン情報は2026年ガイドに基づく · 価格は目安<br/>
        営業時間は必ず公式サイトで最新情報をご確認ください
      </div>

      {selected && <Modal spot={selected} onClose={()=>setSelected(null)}
        isFav={favs.has(selected.id)} toggleFav={()=>toggleFav(selected.id)} />}
    </div>
  );
}

<div align="center">

<a href="https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=banner&utm_campaign=awesome-wan-3.0-prompts"><img src="assets/banner.jpg" alt="Awesome Wan 3.0 Prompts" width="100%"></a>

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey)](LICENSE)
[![Prompts](https://img.shields.io/badge/Prompts-59_official_cases-111111)](#menu)
[![Try Wan 3.0 on APIKO](https://img.shields.io/badge/Try_Wan_3.0-on_APIKO-4F46E5)](https://apiko.app/models/wan3.0-text-to-video?utm_source=github&utm_medium=badge&utm_campaign=awesome-wan-3.0-prompts&utm_content=model_try)
[![Wan 3.0 API docs](https://img.shields.io/badge/Wan_3.0-API_docs-111111)](https://apiko.app/docs/api-manual/video-series/wan3.0/wan3.0-overview?utm_source=github&utm_medium=badge&utm_campaign=awesome-wan-3.0-prompts&utm_content=docs)

[![🇺🇸 English](https://img.shields.io/badge/%F0%9F%87%BA%F0%9F%87%B8_English-Current-111111)](README.md)
[![🇨🇳 简体中文](https://img.shields.io/badge/%F0%9F%87%A8%F0%9F%87%B3_%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-%E6%9F%A5%E7%9C%8B-4F46E5)](README_zh-CN.md)
[![🇹🇼 繁體中文](https://img.shields.io/badge/%F0%9F%87%B9%F0%9F%87%BC_%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87-%E6%9F%A5%E7%9C%8B-4F46E5)](README_zh-TW.md)
[![🇰🇷 한국어](https://img.shields.io/badge/%F0%9F%87%B0%F0%9F%87%B7_%ED%95%9C%EA%B5%AD%EC%96%B4-%EB%B3%B4%EA%B8%B0-4F46E5)](README_ko.md)

</div>

# Awesome Wan 3.0 Prompts

<a id="introduction"></a>
## 🌟 Introduction

**59 prompts from Alibaba's official Wan 3.0 creator handbook, each with the video it produced.**

They are grouped by what they do, from plain text to video through image, video and audio references to editing and extending a clip. Find one close to your shot, copy it, and change only what you need. Every result and source video plays right here on GitHub.

Search and filter them on [apiko.app/wan-3-0-prompts](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=readme&utm_campaign=awesome-wan-3.0-prompts&utm_content=intro).

> [!NOTE]
> The Chinese prompts are the handbook's original text. The English, Traditional Chinese and Korean versions are translations; every case keeps the original under *Original prompt (Chinese)*.

<a id="quick-start"></a>
## 🚀 Quick start

**In the browser:** every case has a **Run on APIKO** link. It opens the example on [apiko.app](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=quickstart&utm_campaign=awesome-wan-3.0-prompts&utm_content=browser); press **Use** there to load the prompt and its reference files into the Wan 3.0 playground.

**With the API:** create an [APIKO API key](https://apiko.app/dashboard/apikeys?utm_source=github&utm_medium=quickstart&utm_campaign=awesome-wan-3.0-prompts&utm_content=api_key), then create a task and poll it until the video is ready. Reference images, videos and audio go in the request body; see [the FAQ](#faq).

```bash
export APIKO_API_KEY="your_key_here"

TASK_ID=$(curl https://api.apiko.app/v1/videos \
  -H "Authorization: Bearer $APIKO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "wan3.0-text-to-video",
  "duration": 5,
  "resolution": "720p",
  "aspect_ratio": "16:9",
  "prompt": "A paper boat drifting across a calm lake at sunrise, slow cinematic camera move."
}' | python3 -c 'import json,sys; print(json.load(sys.stdin)["id"])')

while :; do
  TASK=$(curl -s https://api.apiko.app/v1/videos/$TASK_ID \
    -H "Authorization: Bearer $APIKO_API_KEY")
  printf '%s\n' "$TASK"
  printf '%s' "$TASK" | grep -qE '"status": *"(completed|failed)"|"error": *\{' && break
  sleep 5
done
```

Endpoints: `POST https://api.apiko.app/v1/videos` (create a task) · `GET https://api.apiko.app/v1/videos/{id}` (read the status and `video_url`)

<a id="how-to-write"></a>
## ✍️ How to write a Wan 3.0 prompt

Four ways to build a prompt, adapted from the official handbook.

- **Basic** · `Subject + scene + motion` — Who or what, where, and what it does. Enough for a first try, and it leaves room for the model to improvise.
- **Advanced** · `Subject + scene + motion + aesthetic control + style + sound` — Add lighting, shot size, angle and camera moves, a named visual style, and the audio. Describe motion by size and speed ("slowly", "violently") and say what it affects.
- **Image or first frame** · `Motion + camera` — The picture already fixes subject, scene and style, so write only what moves and how the camera follows.
- **Sound** · `Voice + sound effects + music` — Give each line of dialogue or narration and describe the voice (low and rough, cute), then the effects and the background music.

**What the examples show**

- **Time-box long clips.** The 30-second prompts split into shots or segments with a time range each, such as "Segment 1 [0-5 s]" or "(0:00 - 0:03)".
- **Mark sound in the prompt.** Sound effects go in angle brackets, <footsteps on wood>, and spoken lines in curly braces, {Let us go}.
- **Number your references.** Call files Image1, Video1 and Audio1 (or 图1 in Chinese), in the order you pass them.
- **Name the change, then lock the rest.** Edit prompts state one change and close with what stays: "the woman's movement and everything else stay unchanged".
- **Mind the 30-second ceiling when extending.** Input plus output length stays within 30 seconds, so extending a 15-second clip by 15 seconds fills it.

<a id="menu"></a>
## 📑 Menu

- [🎬 Text to video](#text-to-video) (17)
  - [Silent Graduate in Gown](#text-to-video-01)
  - [Desperate Call in Empty Hospital](#text-to-video-02)
  - [One-Take Idol Scandal Comedy](#text-to-video-03)
  - [Cart Crashes Into Billboard](#text-to-video-04)
  - [Skeleton Soldier Finds a Flower](#text-to-video-05)
  - [Sea Monster Breaks the Storm](#text-to-video-06)
  - [Cowgirl Refuels Her Horse](#text-to-video-07)
  - [Explorer and the Glowing Giant Plant](#text-to-video-08)
  - [White-Dress Girl at the Cliff](#text-to-video-09)
  - [Exhausted Boxer Keeps Punching](#text-to-video-10)
  - [Cold Smile Before the Void](#text-to-video-11)
  - [UFO Abducts a Farm Cow](#text-to-video-12)
  - [Five-Member Monochrome Dance Showpiece](#text-to-video-13)
  - [Plush Space Escape from a Whale](#text-to-video-14)
  - [Flying Apsara vs Vajra Warrior](#text-to-video-15)
  - [Giant Dice on Havana Streets](#text-to-video-16)
  - [Doodle Monsters Invade a Night Kitchen](#text-to-video-17)
- [🖼️ Image reference](#image-reference) (15)
  - [Rainy Platform Goodbye](#image-reference-01)
  - [Five Headpieces Flip Card Showcase](#image-reference-02)
  - [Dragonfly-Style Micro Flyer Chase](#image-reference-03)
  - [Two Cats, Four Absurd Scenes](#image-reference-04)
  - [Duel Among Reeds at Dusk](#image-reference-05)
  - [Paper-to-UI Launch Reveal](#image-reference-06)
  - [Lip Gloss Model Try-On](#image-reference-07)
  - [Kindness After Closing Time](#image-reference-08)
  - [Clay Fox's Apple Journey](#image-reference-09)
  - [Lace Blouse at a Café Door](#image-reference-10)
  - [Door to a Magic Alley](#image-reference-11)
  - [Three-Hero Game Trailer](#image-reference-12)
  - [Two-Model Hard-Cut Fashion Film](#image-reference-13)
  - [Neon City Orb Chase](#image-reference-14)
  - [Black Truffle Nut Crisp Showcase](#image-reference-15)
- [🎥 Video reference](#video-reference) (3)
  - [Skateboard Motion, New Rider](#video-reference-01)
  - [Coffee on Rooftop, Reference Camera](#video-reference-02)
  - [Energy Effect Transfer to Person](#video-reference-03)
- [🎵 Audio reference](#audio-reference) (3)
  - [Gym Buddies Plan Their Workout](#audio-reference-01)
  - [Idol Dance to Audio Beat](#audio-reference-02)
  - [Man on Phone by the Window](#audio-reference-03)
- [✂️ Video editing](#video-edit) (15)
  - [Pool Clutter Removal](#video-edit-01)
  - [Add Vase to Wooden Table](#video-edit-02)
  - [Remove Man on the Left](#video-edit-03)
  - [Girl Re-cast as Young Woman](#video-edit-04)
  - [Enlarged Sailboat on Water](#video-edit-05)
  - [Remove Hat, Show Natural Hair](#video-edit-06)
  - [Half-Buried Rock on Beach](#video-edit-07)
  - [Skater Swapped to Short-Haired Woman](#video-edit-08)
  - [Remove Sunglasses, Show Eye Makeup](#video-edit-09)
  - [Brighten With TV-Style Three-Point Light](#video-edit-10)
  - [Swap Positions: Suited Man and Ostrich](#video-edit-11)
  - [Whole Clip to Claymation](#video-edit-12)
  - [Swap Line to English Dialogue](#video-edit-13)
  - [Reference Hats and Denim Shirt](#video-edit-14)
  - [Man Picks Up Guitar and Plays](#video-edit-15)
- [⏩ Video extension](#video-extend) (3)
  - [Teahouse Shipment Negotiation](#video-extend-01)
  - [Waltz Invitation in Ballroom](#video-extend-02)
  - [Snowy Path Smile, Both Ways](#video-extend-03)
- [🎞️ First and last frame](#first-last-frame) (3)
  - [Ink Swordsman in Bamboo Grove](#first-last-frame-01)
  - [Woman in Straw Hat Remembers](#first-last-frame-02)
  - [West Lake Water Goddess](#first-last-frame-03)
- [❓ FAQ](#faq)
- [🔗 Related](#related)

<a id="text-to-video"></a>
## 🎬 Text to video

> Whole clips written from a text prompt alone, up to 30 seconds and several shots long. · 17 cases

<a id="text-to-video-01"></a>
### 1. Silent Graduate in Gown

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-01#text-to-video-01)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

One close-up with handheld breathing; her gaze shifts from the camera to her hands, shot in natural light.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/b42bdc52-406f-4a66-9dc3-26e931514feb" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
This is a frontal close-up shot, mainly showing the head and upper body of a young Black girl wearing a blue graduation gown. The camera is shifted slightly, and a person on the left is visible, but the background is softly blurred and looks out of focus. The girl is speaking directly to the camera, her lips moving, brow slightly furrowed, her expression looking somewhat serious and worried. Light falls from above and outlines her face naturally, and the real texture of her skin is visible. The camera is fixed, but carries a slight breathing and shake like handheld shooting; her gaze slowly shifts from looking ahead to looking down at something in her hands.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
这是一个正面的近景镜头，画面主要呈现一位年轻黑人女孩的头部和上半身，她穿着一件蓝色的毕业袍。镜头稍微偏一点点，可以看到左边还有一个人，但背景被虚化处理了，看起来很模糊。女孩正对着镜头说话，嘴巴在动，眉头稍微皱着，表情看起来有点严肃和忧虑。光线从上方照下来，把她脸上的轮廓衬托得很自然，甚至能看到皮肤真实的质感。镜头虽然固定，但带着一点点人手持拍摄时的轻微呼吸感和晃动，视线从看着前面慢慢变成了低头看手里。
```

</details>

<a id="text-to-video-02"></a>
### 2. Desperate Call in Empty Hospital

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-02#text-to-video-02)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Dolly-back tracking shot with running footsteps and cries; cold green grade and quiet corridor build dread.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/c00e3016-40d4-4c27-bbca-7822927b7c97" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
A modern suspense cinematic long take with a strong pale-green filter that creates a cold, clear atmosphere. Under cold white fluorescent light, an empty hospital corridor shows low-saturation colors and extreme contrast between light and shadow, sharp and impersonal. The camera starts behind the nurses' station, as a woman in a dark green jacket bursts out from a door at the end of the corridor and runs quickly toward the lens along the symmetrical center line, while the camera dollies smoothly backward. Her footsteps are rapid and loud, and she calls out anxiously. Finally she reaches the counter, slams both hands down on it, looks around in despair, and lets out a nearly breaking cry for help that echoes through the silence, broken only by the faint hum of equipment.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
一段现代悬疑风格的电影感长镜头，整个画面呈现出强烈的淡绿色滤镜风格，营造出一种基于淡绿色系的清冷氛围。在散发着冰冷白光的荧光灯下，空无一人的医院走廊呈现出低饱和的色彩与极高对比的光影关系，锐利且非人情化。镜头从护士台后方开始，一名身穿墨绿色夹克的女子猛地从走廊尽头的门后冲入，沿着对称的中心线向镜头快速跑来，摄影机流畅地向后移动。她的脚步声急促而响亮，口中焦急地呼喊。最终，她冲到台前，双手用力拍在台面上，绝望地环顾四周，发出几近崩溃的求助呐喊，声音在只有微弱设备嗡鸣的寂静中回荡。
```

</details>

<a id="text-to-video-03"></a>
### 3. One-Take Idol Scandal Comedy

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-03#text-to-video-03)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Fast pans switch between director and actor in one take, with expression flips and staged dialogue beats.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/636ae3e4-d214-421f-9059-443260c6c23c" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Shot 1 [0s–30s]
Close-up, eye-level angle, continuous fast pans, one take (single shot, seamless continuous camera movement):
On the left of the frame is a director wearing a black trendy director's vest and a premium professional headset; a huge professional film camera sits at his lower left. On the right is a well-connected young idol with polished makeup, a fashionable Korean-style comma bang, and a custom-tailored suit. The background is a spacious professional studio set, with a huge green screen, several tall film-grade C-stands, tangled cables, and busy lighting technicians and makeup artists moving through the background.
Professional studio artificial light. Soft LED softbox light falls in from the right, evenly lighting the faces of the three main characters, with rich, full colors across the scene. The camera gear and green screen in the background cast faint shadows under the ample studio light, giving the real, busy texture of a modern large-budget film set.
Handheld one-take shot, close-up. At the start, the camera shoots the director. With an indifferent expression, he glances at the idol standing diagonally off-frame to the right and gives an order, saying: “The media is deliberately slandering you, make a face and let’s see.” After he finishes, the camera quickly pans right to a close-up of the idol's face, with no cut. The idol faces diagonally off-frame toward the director on the left, calm and composed, his eyes sincere and confident. His lips move slightly, and he explains professionally to the other side: ““Of this kind of matter, emotions can come in several types,” and as he speaks his head shows a very slight natural sway. After he finishes, the camera quickly pans left to a close-up of the director's face, with no cut. The director thinks for a moment, tilts his head in a provocative way, and says to the idol: ““Paparazzi exposed you meeting someone late at night,” and right after the director finishes his line, the camera quickly pans right to a close-up of the idol's face. The idol still faces the director diagonally off-frame on the left and quickly slips into performance mode: his brow tightens, his eyes dart around in panic and anxiety, and then he bites his lower lip hard, closes his eyes, and his whole face (despite the polished makeup) tightens with extreme anxiety, perfectly showing the inner struggle of terror and tension as he faces the destruction of his idol career. After the performance, the camera quickly pans left again to a close-up of the director, with no cut. The director's expression changes slightly, and he speaks faster, saying: ““The media cleaned you up again, saying that’s your real older sister!” After the director finishes, the camera quickly pans right again to a close-up of the idol, with no cut. Within a thousandth of a second, the idol's expression makes a dramatic transformation. First his face freezes, then his eyes suddenly narrow, and his mouth corners stretch wide, showing a row of white teeth, forming an extremely exaggerated, even slightly distorted, ecstatic smile. This frenzied emotion, where the despair of a shattered career and the thrill of being freed from restraint tangle together, twists visibly across his face. After the character's performance, the camera quickly pans left again to a close-up of the director, with no cut. The director says: “Your older sister revealed to the media that you were adopted.” After the director finishes, the camera quickly pans right again to a close-up of the idol, with no cut. Inside the frame, the idol still faces the director diagonally off-frame on the left. His eyes flare wide, his eyeballs bulge, his carefully trimmed eyebrows rise high, and his mouth opens into a shocked “O” shape. Right after, the corners of his mouth again pull upward, uncontrollably, into a complex look of disbelief and lingering fright. After the character's performance, the camera quickly pans left again to a close-up of the director, with no cut. Right after, the director shows a slightly surprised look and says: “Actually, you are the real young master of a billion-dollar wealthy family.” When the director finishes, the camera again quickly pans right to a close-up of the idol, with no cut. Inside the frame, the idol still faces the director diagonally off-frame on the left, and he instantly bursts into an extremely unhinged ecstasy. He trembles slightly with excitement, his eyes squeezed into thin slits from laughing, and he even raises both hands to his chest, clapping rapidly and continuously in small motions, leaning forward and swaying, fully acting out the wild joy of becoming rich overnight and being unable to contain it. After the character's performance, the camera quickly pans left again to a close-up of the director, with no cut. The director says: “Your sister took the money and ran.” When he finishes, the camera quickly pans right again to a close-up of the idol. The idol still faces the director diagonally off-frame on the left. His eyes widen again, his pupils tremble, the corners of his mouth droop, and within one second his expression falls from heaven into hell, filled with astonishment, pain, and helplessness. The frame ends by freezing on this expression.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
镜头1 [0秒-30秒]
近景，平视视角，连续快速摇镜，一镜到底（单镜头连续无缝运镜）：
画面左侧是身穿黑色潮流导演马甲、戴着高档专业工作耳麦的导演，其左下方放置着一台巨大的专业电影摄像机。右侧是妆容精致、留着时尚韩式逗号刘海、身穿高定制西装的关系户小鲜肉。背景是宽敞的专业影棚拍摄现场，可见巨大的绿色幕布、数个高耸的影视级C型灯架、缠绕的电线，以及在背景中穿梭忙碌的灯光师和化妆师等工作人员。
专业影棚人工光。柔和的LED柔光箱光源从右侧洒入，将三位主角的面部均匀照亮，场景色彩饱满。背景的摄影器材与绿幕在充足的影棚灯光下投射出淡淡的阴影，呈现出真实而忙碌的现代化大制作片场质感。
镜头手持拍摄一镜到底，近景，镜头一开始，拍摄导演，导演无所谓的表情，瞥了一眼画面右侧斜前方画外的一眼关系户小鲜肉，对他下达指令，说道：“媒体故意黑你，做个表情看看”。说完后镜头快速右摇到关系户面部近景，镜头不要切镜，关系户小鲜肉，面部朝向画面左侧斜前方画外导演方向，神色自若，眼神真挚而自信。他嘴唇微动，神情专业地向对方阐述到““就这种事情来说，情绪可以有好几种”，说话时，头部伴有极其轻微的自然晃动，说完后镜头快速左摇到导演面部近景，镜头不要切镜，导演思索了一下，一边挑衅似地歪了歪头，向关系户小鲜肉说到““狗仔爆料你深夜幽会”，导演说完台词后，镜头迅速右摇到小鲜肉面部近景，不要切镜，关系户小鲜肉，面部朝向画面左侧斜前方画外导演方向，并快速进入表演状态，他眉头紧锁，眼神慌乱、焦急地快速游移，随后他狠狠地咬紧下唇，闭上双眼，整张脸（虽带着精致妆容）因极度的焦虑而紧绷，完美呈现出面对偶像生涯毁灭时，内心惊恐、紧张交织的挣扎状态。表演完后， 镜头再次迅速左摇到导演近景，不要切镜，导演面部表情微变，语速加快，说到““媒体又帮你洗白了，说那是你亲姐！”导演说完后，镜头再次迅速右摇到小鲜肉近景，镜头不要切镜，镜头中，关系户小鲜肉，面部朝向画面左侧斜前方画外导演方向，他的表情在千分之一秒内完成神级转换。他先是面部一滞，随后双眼猛地眯起，嘴角极大程度地咧开，露出一排白皙的牙齿，展露出一个极其夸张、甚至有些变形的狂喜笑容。这种“星途尽毁的绝望”与“彻底摆脱束缚”交织的疯魔情绪在他脸上扭曲呈现。角色表演完后，镜头再次迅速左摇到导演近景，镜头不要切镜，导演说到“你亲姐向媒体透露，你是领养的”，导演说完后，镜头再次迅速右摇到小鲜肉近景。镜头不要切镜，镜头内，关系户小鲜肉面部朝向画面左侧斜前方画外导演方向，只见他双眼暴睁，眼球凸出，精心修剪的眉毛高高扬起，嘴巴震惊地张成“O”形。紧接着，他的嘴角再次无法克制地向上拉扯，露出一副不可思议、惊魂未定却的复杂神态。 角色表演完后，镜头再次快速左摇到导演近景，镜头不要切镜，紧接着导演露出有点惊讶的表情说到“其实你是千亿豪门真少爷”。导演说完，镜头再次随即迅速右摇到小鲜肉近景，镜头不要切镜，镜头内，关系户小鲜肉面部朝向画面左侧斜前方画外导演方向，他瞬间爆发出极度魔性的狂喜。他整个人激动得微微颤抖，双眼笑得眯成了一条缝，双手甚至抬起至胸前，双手小幅度快速连续鼓掌，身体前倾摇晃，将一夜暴富、无法自持的癫狂喜悦演绎得淋漓尽致。 角色表演完后，镜头再次快速左摇到导演近景，镜头不要切镜，导演说到“你姐卷款跑路”导演说完，镜头再次迅速右摇到小鲜肉近景。小鲜肉面部朝向画面左侧斜前方画外导演方向，只见他的双眼再次瞪大，瞳孔颤抖，嘴角向下耷拉，神情在一秒钟之内从天堂坠入地狱，写满了惊愕、痛苦与不知所措。画面最后定格在这个表情上。
```

</details>

<a id="text-to-video-04"></a>
### 4. Cart Crashes Into Billboard

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-04#text-to-video-04)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Four timed segments in one continuous take: a boy rides a shopping cart into a billboard's flat world.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/dcb0a3a4-6f54-4894-ab18-4d8ae7517ef6" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
This is a 30-second cinematic, high-intensity one-take visual spectacle, styled as “West Coast street fantasism,” blending the gritty texture of 1990s street skate videos with the polish of modern commercial blockbusters. The overall image uses an extreme “California sunshine” cinematic grade: highly saturated blue skies contrast with palm tree shadows under direct sunlight, and the air is filled with the heat of asphalt, the metallic rattle of shopping cart wheels, and a fearless spirit of youthful rebellion. Spatial perspective is stretched continuously as the protagonist races forward, and the camera builds strong visual impact through low-angle tracking and highly dynamic physical movement.

The protagonist is a stylish, cool teen in a color-block striped shirt and a black baseball cap, whose expression shifts instantly from lazy relaxation to a frenzied rush to break every limit. In the second scene, the protagonist is the same boy, but he appears in the real dimension as an “observer.”

Shot 1, 0–6s:
The opening is a close-up: the boy lazes in a red metal shopping cart, with the iconic straight California avenue and towering palm trees behind him. As the music's rhythm bursts, the camera executes a rapid pull-back and dips to the ground, hugging the wheels at a very low angle. The boy begins to plunge down a steep road. The cart jolts violently over the surface, cars on both sides rush backward, and the lens captures an almost frenzied sense of acceleration.

Shot 2, 7–15s:
No cut. The camera follows tightly at ground level, like a skateboarder. As the boy passes over a simple wooden ramp, the lens executes a graceful parabolic lift. The cart leaps into the air, and the camera passes beneath it. At this moment a huge commercial billboard quickly fills the view, and the lens pushes in with incredible “crosshair” precision, aiming straight at the center of the billboard.

Shot 3, 16–24s:
No cut. The boy and his cart plunge straight into the giant billboard, as if breaking through the fourth wall. His three-dimensional body flattens the instant it touches the poster, and real paper-tearing textures and colorful glitch-ink smears appear on screen. The boy keeps his gliding posture, yet becomes a flat artwork on the billboard. At this point the camera performs a 180-degree horizontal orbit, then dives from high above and drops back to the ground.

Shot 4, 25–30s:
No cut. The lens descends smoothly to the street directly beneath the billboard, where another “real” boy appears. He stops, slowly lowers his cap brim, and looks up with a playful smile at the “frozen” version of himself on the billboard. The camera follows his gaze with a fast zoom-in, finally settling on the torn hole beside the “WAN” lettering on the billboard. The background music blends energetic hip-hop rhythm with the physical sound of film reels turning, and the visual information is highly condensed and full of stylish rebellious energy.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
这是一段30秒电影级高强度单镜头（One-Take）视觉奇观短片，整体风格定位为“西海岸街头幻想主义”，视觉语言融合了90年代街头滑板录像的粗粝感与现代商业大片的精致质感。画面整体采用极致的“加州阳光”电影级调色，高饱和度的蓝色天空与阳光直射下的棕榈树影子形成强烈的对比，空气中弥漫着柏油马路的炙热感、购物车轮摩擦的金属声以及一种无所畏惧的青春叛逆气息。空间透视随着主角的极速滑行不断被拉长，镜头通过极低角度的跟随与极高动态的物理穿梭营造强烈的视觉冲力。

主角是一位穿着撞色条纹衫、带着黑色棒球帽的潮酷少年，神情从最初的慵懒松弛瞬间切换为冲破极限的亢奋；第二个场景的主角则是同一个少年，但他以一种“审视者”的姿态出现在现实维度。

第一个镜头 0-6s：
起幅为特写镜头，少年慵懒地躺在一辆红色铁质购物车内，背景是加州标志性的笔直大道与高耸入云的棕榈树。随着音乐节奏爆发，摄影机执行一个极速的向后拉远并下沉至地面，以极低角度紧贴车轮。少年开始在陡峭的公路上俯冲，购物车在路面上剧烈颠簸，两侧的汽车急速倒退，镜头捕捉到一种近乎疯狂的加速感。

第二个镜头 7-15s：
不切镜，摄影机像一个滑板手般紧紧贴地跟随，镜头在少年越过一个简易木质斜坡的瞬间，顺势执行一个优美的抛物线拉升。购物车腾空而起，摄影机从购物车底部穿过。此时，前方的巨型商业广告牌迅速占据整个视野，镜头以一种不可思议的“准心式”推进，直指广告牌中心。

第三个镜头 16-24s：
不切镜，少年连同购物车以一种“破裂次元壁”的方式直接嵌入了巨大的广告牌中。原本三维的身体在接触海报的瞬间发生“扁平化”质变，画面中出现真实的纸张撕裂纹理与彩色故障墨迹。少年保持着滑行的姿态，却化为了广告牌上的一幅平面艺术作品。摄影机在此时执行一个180度的水平环绕，并在高空进行一个俯冲降落，重回地面。

第四个镜头 25-30s：
不切镜，镜头平滑降落至广告牌正下方的街道，画面中出现另一个“真实”的少年。他停下脚步，缓缓压低帽檐，带着一丝玩味的微笑抬头望向广告牌上那个“被定格”的自己。摄影机顺着他的视线执行一个快速的变焦推近，最终定格在广告牌上“WAN”字样旁那个被撕裂的洞口。背景音乐融合了高能的嘻哈节奏与胶片卷动的物理声，视觉信息高度凝练且充满时尚反叛力。
```

</details>

<a id="text-to-video-05"></a>
### 5. Skeleton Soldier Finds a Flower

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-05#text-to-video-05)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Seven timed segments trace a skeletal machine soldier that defies orders to shelter a sprouting flower.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/1ef4be8d-cd78-4e05-b790-262c0b09d817" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Generate a 30-second, 16:9 landscape adult sci-fi war animated short.

The visual style:

hyper-realistic CGI;
bio-mechanical structures;
grey-white bone fused with black metal;
insect-like jointed limbs;
extremely fine bone texture;
dried blood stains, ceramic cracks, and industrial oil grime;
an abandoned future city;
cold grey daylight;
a small amount of toxic green life forms;
high-contrast cinematic lighting;
low-saturation cool palette;
very limited orange-red for flames and alarms;
realistic physical destruction;
oppressive, heavy, with no heroism.

The characters no longer have complete bodies. They are mainly made of:

human spines;
ribs;
skulls;
black hydraulic muscles;
metal joints;
neural optical fibers;
weapon interfaces.

The skeletons are not zombies, but “legacy hardware” that the military-industrial system keeps using.

30-second storyline and dynamic timeline
0–4 seconds | Still fighting after death

The camera opens on a soldier's identification tag falling into a puddle.

In the distance, mechanical footsteps. The water surface trembles as a three-meter-tall skeletal war machine strides over the frame from above.

The camera rushes low along the ground, moving up its mechanical foot, hydraulic calf, and exposed spine, and finally stops at the interface at the back of its skull.

A red command keeps flashing inside the interface:

ADVANCE

The city behind is empty, but in the distance the skeletal army is still in combat.

4–8 seconds | Automated war in a ruined city

The camera suddenly bursts out from behind the war machine's shoulder and enters the city streets.

Dozens of skeletal war machines fight among abandoned high-rises:

automatic cannons unfold between the ribs;
spines bend backward to absorb recoil;
after a skull is shattered, the body keeps walking;
black drones fly around the corpses like flies;
tattered billboards still broadcast a recruitment ad for a war that has already ended.

The camera passes through the firefight on a high-speed FPV path:

it threads between the skeletal ribs;
it skims past the sides of bullet trajectories;
it flies past an overturned armored vehicle;
it rolls rapidly to avoid a falling floor slab.

8–12 seconds | A flower appears

The protagonist skeletal war machine suddenly stops.

In a crack in the concrete by its feet, a tiny pale-green flower is growing.

All ambient sounds briefly drop.

The camera rapidly pushes from the distant war scene into a macro close-up of the flower:

the petals are translucent;
fine pulses move inside them;
a dewdrop reflects the shattered skull of the war machine;
its mechanical foot nearly stomps down, but stops with one centimeter to spare.

The war machine's head slowly turns, and the red command starts flashing error codes.

12–16 seconds | The first defiance of programming

Distant cannons lock onto the protagonist.

It does not advance. Instead it crouches, using its ribs and mechanical arms to wrap around the flower.

Shells come flying in.

The camera executes a rapid 180-degree orbit around the protagonist. The shells whistle past the lens and strike the building behind.

The explosion's shockwave kicks up dust. Part of the protagonist's skeleton is blown apart, but it still shields the flower with its body.

The red command changes to:

OBJECTIVE LOST

16–21 seconds | The skeletal army turns

All the war machines around stop fighting at once.

Their skulls mechanically turn toward the protagonist.

Hundreds of red targeting points land on its body.

The protagonist slowly stands up and hides the flower inside its hollow chest. The ribs close like a cage.

The camera shoots from inside the chest, looking outward through the ribs as the entire skeletal army begins its charge.

21–26 seconds | Desperate escape

The protagonist suddenly turns and runs at high speed.

The camera hugs its back:

it passes through a collapsed subway entrance;
it leaps down from broken tracks;
the skeletal army pours in from behind;
one of its legs is shot off;
it keeps crawling forward with its mechanical spine and arms;
the flower in its chest keeps emitting green light.

Inside the subway tunnel, the camera rolls wildly and continuously as it follows the protagonist into a narrow maintenance duct.

26–30 seconds | Reversal

The protagonist hides in a dark underground facility.

It opens its ribs, and the flower has grown a large number of tiny roots. The roots rapidly pierce its neural interfaces.

Green light spreads from the chest outward along the spine, through the entire body.

For the first time, the war machine lifts its head, as if it has gained a new consciousness.

The next second, hundreds of thousands of the same green flowers light up deep underground. All of them open at once, revealing structures inside that look like eyes.

A new command appears on the system interface:

GERMINATION COMPLETE

The screen immediately cuts to black.

Camera design
opening with a low-angle macro shot;
close tracking along the ground at high speed;
passing through the inside of the ribs;
directional camera shake during explosions;
large orbit moves when the protagonist defies programming;
continuous low-altitude FPV during the escape;
the final shot pulls back fast from an extreme close-up of the flower, revealing the entire underground ecosystem.

Key points of motion
the bone joints must feel heavy;
after fractures, movement must still follow mechanical logic;
the ribs open and close like protective pods;
the contrast between soft flower and hard machine;
the war scenes must not be just background explosions; they need full spatial traversal.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
生成一支 30 秒、16:9 横屏比例的成人科幻战争动画短片。

画面采用：

超写实 CGI；
生物机械结构；
灰白骨骼与黑色金属融合；
类昆虫式关节；
极端精细的骨质纹理；
干燥血痕、陶瓷裂纹和工业油污；
废弃未来城市；
冷灰色天光；
少量毒绿色生命体；
高反差电影照明；
低饱和冷色系；
火焰和警报使用极少量橙红色；
写实物理破坏；
压迫、沉重、无英雄主义。

人物不再有完整肉体，主要由：

人类脊柱；
肋骨；
头骨；
黑色液压肌肉；
金属关节；
神经光纤；
武器接口组成。

骨骼不是丧尸，而是被军工系统继续使用的“遗留硬件”。

30 秒剧情与动态时间轴
0—4 秒｜死亡之后仍在战斗

镜头从一枚掉落在积水中的士兵识别牌开始。

远处传来机械步伐。积水表面震动，一具三米高的骨骼战兵从画面上方跨过。

摄影机迅速贴地前冲，沿它的机械脚掌、液压小腿和裸露脊柱向上移动，最后停在其后脑接口。

接口中持续闪烁一条红色指令：

ADVANCE

城市背景空无一人，但远处骨骼军队仍在交火。

4—8 秒｜废城自动战争

镜头突然从战兵肩后高速冲出，进入城市街道。

数十具骨骼战兵在废弃高楼间战斗：

自动火炮从肋骨间展开；
脊柱向后弯曲吸收后坐力；
头骨被击碎后，身体仍继续行走；
黑色无人机像苍蝇一样围绕尸骨飞行；
破败广告屏仍播放早已结束的征兵宣传。

摄影机以高速 FPV 轨迹穿过交火区：

从骨架肋骨之间钻过；
贴着弹道侧面掠过；
穿过一辆翻覆装甲车；
急速滚转避开坠落楼板。
8—12 秒｜花朵出现

主角骨骼战兵突然停下。

它脚边的混凝土裂缝中，长出一朵极小的淡绿色花。

所有环境声短暂降低。

镜头从战争远景快速推向花朵微距：

花瓣半透明；
内部有细小脉冲；
露珠映出战兵破碎的头骨；
机械脚掌差点踩下，却在最后一厘米停住。

战兵头部缓慢偏转，红色指令开始闪烁错误代码。

12—16 秒｜第一次违抗程序

远处火炮锁定主角。

它没有继续前进，而是蹲下，用肋骨和机械手臂包围花朵。

炮弹飞来。

摄影机绕主角完成快速 180 度环绕，炮弹从镜头旁擦过，击中后方建筑。

爆炸冲击波掀起沙尘，主角骨骼被炸裂一部分，但仍用身体护住花朵。

红色指令变成：

OBJECTIVE LOST

16—21 秒｜骨骼军队转向

周围所有战兵同时停止战斗。

它们的头骨机械式转向主角。

数百枚红色瞄准点落在它身上。

主角缓慢站起，将花朵藏进空洞胸腔。肋骨像牢笼一样闭合。

镜头从胸腔内部向外拍摄，透过肋骨看见整支骨骼军队开始冲锋。

21—26 秒｜极限逃亡

主角突然转身高速奔跑。

摄影机紧贴其背部：

它穿过坍塌地铁口；
从断裂轨道跃下；
骨骼军队从后方倾泻而来；
主角一条腿被击断；
它用机械脊柱和手臂继续爬行；
胸腔中的花朵持续发出绿色光。

镜头在地铁隧道中连续大幅滚转，跟随它钻进一道狭窄维修管道。

26—30 秒｜反转

主角躲进黑暗地下设施。

它打开肋骨，花朵已经长出大量细小根须。根须迅速刺入它的神经接口。

绿色光从胸腔沿脊柱向全身扩散。

战兵第一次抬起头，像获得了新的意识。

下一秒，地下深处亮起数百万朵同样的绿色花。所有花朵同时张开，露出内部类似眼睛的结构。

系统界面出现新的指令：

GERMINATION COMPLETE

画面立即切黑。

运镜设计
微距低机位开场；
贴地高速追踪；
肋骨内部穿越；
爆炸时方向性镜头震动；
主角违抗程序时进行大幅环绕；
逃亡阶段持续低空 FPV；
最后一镜从花朵极近景高速拉远，揭示整个地下生态。
动态重点
骨骼关节要有重量；
断裂后运动逻辑仍符合机械结构；
肋骨开合像保护舱；
花朵与机械形成柔软与硬质反差；
战争场面不能只是背景爆炸，要有完整空间穿越。
```

</details>

<a id="text-to-video-06"></a>
### 6. Sea Monster Breaks the Storm

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-06#text-to-video-06)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Ten storyboard shots follow a storm-tossed fishing boat as a giant kaiju-style sea monster rises from the depths.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/ac054a10-ff81-4bc1-af0b-e118d42b5ba1" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
This is a 30-second, real cinematic sea monster reveal, with an overall atmosphere inspired by Hollywood disaster monster blockbusters. The story begins with a small fishing boat struggling through a storm with huge waves and howling wind, and the letters “WAN” are clearly visible on the hull. The camera first establishes the harsh sea conditions and the tiny, fragile state of the boat, then gradually builds pressure through details such as abnormal stirring of the sea surface, shadows underwater, the boat shuddering, and unnatural swells rising from the waves. Finally, a massive deep-sea beast, similar in look to a Pacific Rim-style kaiju, bursts out of the seabed through the waves. Overall, the look must be realistic, heavy, with true-to-life proportions, strong water impact, a high-contrast atmosphere of storm and lightning, and an emphasis on cinematic special-effects texture, the volume of seawater, wet kaiju skin details, and the oppressive sense of giant scale.
Storyboard 1: Night, stormy sea, real cinematic texture. A wide shot shows a small fishing boat pushing forward through giant waves. The hull is old and slick, constantly slapped by the sea, and the white letters “WAN” are clearly visible on its side. The sea surges violently, wind lifts sheets of rain, storm clouds churn in the sky, and distant lightning briefly lights up the whole area. The frame emphasizes real seawater, the stormy environment, hull details, and a sense of smallness and helplessness.
Storyboard 2: A medium-close shot moves toward the bow or the side of the deck. Waves slam violently against the hull, seawater rushes across the deck, and ropes, fishing nets, and metal railings swing wildly in the wind and rain. The camera rolls with the boat's motion, creating a realistic sense of shaking, and rain constantly hits the foreground and the surface of the boat. The WAN logo on the hull briefly enters the frame again. The overall look emphasizes realistic materials, harsh weather, wet metal and wooden structures, and a strong sense of survival crisis.
Storyboard 3: The camera looks out over the sea from the fishing boat's point of view. In the storm, the originally chaotic waves begin to show unnatural huge swells, as if something colossal is rapidly approaching from the seabed. The surface forms massive whirlpools and abnormal churning, wave crests are pushed up from below, and the seawater flows in disordered directions. When lightning illuminates the sea, a faint, enormous dark shape is barely visible far beneath the surface. The frame highlights suspense, the oppressive sea surface, and the horror-omen of a giant closing in.
Storyboard 4: A live-action realistic shot cuts to the fishing boat's deck. The crew struggles to keep their footing in the storm, faces wet with rain and full of terror, turning to look at the abnormal sea. Wind blows at raincoats and hair, deck lights sway, and the waves behind keep rising. The camera moves quickly toward the character's face, then follows his line of sight toward the distant churning sea, linking emotion with danger. The overall look strengthens the on-the-spot feeling of a disaster film and the character's smallness.
Storyboard 5: The camera cuts to a half-underwater or low shot close to the sea surface. Between the storm and the surging waves, an enormous black shadow sweeps quickly past from beneath or beside the fishing boat, stirring up huge bubbles, currents, and a lifting of the sea surface. The fishing boat is suddenly thrown upward or tilts violently, and the hull groans under the strain. The faint light from lightning and the boat's lamps only outlines part of the monster's silhouette, keeping it mysterious yet very oppressive.
Storyboard 6: The camera returns to the sea surface. Ahead, the water is suddenly pushed upward as if by a huge force, forming a rapidly rising wall of waves, with rain and white foam flung up by enormous power. In the foreground the fishing boat is tossed by the waves, and in the distance the center of the sea swells into a huge circular bulge, as if a precursor to a submarine volcanic eruption. The atmosphere reaches the peak of tension, and the monster is about to appear.
Storyboard 7: Climax shot. The sea roars apart, and a massive deep-sea beast bursts out of the seabed through the waves, raising tens of meters of waves and clouds of mist. In the style of Pacific Rim kaiju, the beast is huge, ferocious, with an alien creature structure, a rough, heavy, wet skin, sharp bony spikes, a huge head silhouette, glowing details, or horrifying textures like deep-sea creatures. Lightning tears across the night sky, briefly illuminating parts of the whole body and its wide-open jaws. The frame emphasizes true scale, the impact of seawater, and the oppressive presence of the monster.
Storyboard 8: A medium-close or low-angle shot aims at the beast's head and upper body. In the storm and lightning, the beast raises its torso, its skin covered with seawater, scars, horny structures, and deep-sea creature textures, opening its mouth to let out a stunning roar. Rain runs down its exoskeleton and scales, and details of its eyes or head look especially terrifying under the lightning. The emphasis is on wet biological texture, realistic skin structure, a sense of weight, and cinematic monster design.
Storyboard 9: The camera returns to the fishing boat, which is violently flipped up by the shockwave and waves from the beast's emergence. The deck tilts, seawater pours in, ropes snap, and the deck lights flash. The WAN logo flashes past on the violently shaking hull, and the fishing boat is nearly swallowed by a giant wave. The frame emphasizes how fragile human creations are before the beast, with seawater, wooden boards, metal debris, and the curtain of rain together forming a chaotic disaster scene.
Storyboard 10: The final shot pulls back. The beast towers above the raging sea, with huge waves churning around it, and the fishing boat looks extremely tiny in the foreground or lower to the side. Lightning strikes the sky again, briefly lighting the monster's enormous silhouette, its back spikes, and the churning seawater, forming an epic final image like a disaster monster poster. The frame holds on the most shocking moment and ends with a sense of scale and doom.
The score follows the style of a Hollywood disaster monster film. The opening builds unease with low ambient sounds, deep-sea low-frequency rumbles, sparse drums, and oppressive strings. As the sea begins to move abnormally, stronger low-end pulses, metallic impacts, and layered string tension are gradually added. Just before the beast surfaces, the music enters an almost breath-holding hover and keeps rising. When the beast bursts through the waves, huge brass, heavy percussion, and low-frequency impacts explode into a disaster-level climax. The ending closes with long, heavy, doom-laden sustained tones and drumbeats that reinforce the epic sense of the monster standing on the sea.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
这是一段30秒的真实电影质感海上巨兽登场场景，整体氛围参考好莱坞灾难怪兽大片。故事从一艘在暴雨狂风中艰难航行的小型渔船开始，船身上清晰可见 “WAN” 的标识。镜头先建立恶劣海况与渔船渺小脆弱的状态，再逐步通过海面异动、水下阴影、船体震动、海浪异常隆起等细节制造压迫感，最终一头体型庞大、形象类似《环太平洋》怪兽风格的深海巨兽从海底破浪而出。整体要求写实、厚重、真实比例、强烈水体冲击、暴雨与闪电下的大光比氛围，强调电影级特效质感、海水体积感、怪兽皮肤湿润细节和巨物压迫感。
分镜1：夜晚暴雨海面，真实电影质感，广角镜头展现一艘小型渔船在巨浪中艰难前行，船体老旧、湿滑、被海浪不断拍打，船身侧面清晰可见白色字母 “WAN”。海面波涛汹涌，狂风卷起雨幕，天空乌云翻滚，远处闪电短暂照亮整片海域。画面强调真实海水、暴风雨环境、船体细节和渺小无助感。
分镜2：中近景镜头靠近渔船船头或甲板侧面，海浪猛烈拍打船身，海水冲过甲板，缆绳、渔网、金属栏杆在风雨中剧烈摆动。镜头随着船体起伏产生真实摇晃感，雨水不断打在镜头前景和船体表面。船身上的 WAN 标识再次短暂进入画面。整体强调真实材质、恶劣天气、湿漉漉的金属和木质结构、强烈生存危机感。
分镜3：镜头从渔船视角看向前方海面，暴雨中原本混乱的海浪出现不自然的巨大隆起，像有什么庞然大物正在海底快速接近。海面形成巨大漩涡与异常翻涌，浪峰被从下方顶起，海水流向紊乱。闪电照亮海面时，隐约可见深海下方模糊而庞大的黑影。画面突出悬疑感、海面压迫感与巨物逼近的恐怖预兆。
分镜4：真人写实镜头切入渔船甲板，船员在暴雨中艰难站稳，满脸雨水与惊恐，转头看向异常海面。风吹动雨衣和头发，船灯摇晃，背景中海浪不断升高。镜头快速靠近人物面部，再顺着他的视线转向远处翻涌海面，形成情绪与危险的连接。整体强化灾难片临场感和人物渺小感。
分镜5：镜头切到半水下或贴近海面的低机位，暴雨与浪涛之间，一道极其巨大的黑影从渔船下方或附近快速掠过，带起巨大的气泡、水流和海面抬升。渔船被猛然顶起或剧烈倾斜，船体发出不堪重负的吱嘎声。闪电和船灯的微弱光线只能勾勒出怪兽轮廓的一部分，保持神秘但极具压迫感。
分镜6：镜头回到海面，前方海水突然像被一股巨大力量向上顶开，形成一个迅速抬升的浪墙，暴雨与白色浪沫被巨力掀起。渔船在前景中被海浪甩动，远处海面中央鼓起成巨大的圆形隆起，仿佛海底火山喷发前兆。气氛到达极限紧张，怪兽即将出现。
分镜7：高潮镜头，海面轰然炸裂，一头体型庞大的深海巨兽从海底破浪而出，掀起数十米高的海浪与漫天水雾。巨兽形象参考《环太平洋》怪兽风格：巨大、凶暴、异形生物结构，粗糙厚重的湿润皮肤，锋利骨刺、巨大头部轮廓、发光细节或深海生物般的恐怖纹理。闪电划过夜空，短暂照亮巨兽全身局部与张开的巨口。画面强调真实尺度感、海水冲击力和怪兽压迫感。
分镜8：中近景或仰视镜头对准巨兽头部和上半身，巨兽在暴雨和闪电中抬起身躯，皮肤表面布满海水、伤痕、角质结构和深海生物纹理，张口发出震撼咆哮。雨水顺着怪兽外骨骼和鳞甲流下，眼部或头部细节在闪电下显得异常恐怖。强调湿润生物质感、真实皮肤结构、重量感和电影级怪兽设计。
分镜9：镜头回到渔船，渔船在巨兽出海带来的冲击波与海浪中被猛然掀起，甲板倾斜，海水灌入，缆绳断裂，船灯爆闪。WAN 标识在剧烈晃动的船身上一闪而过，渔船几乎被巨浪吞没。画面强调人类造物在巨兽面前的绝对脆弱感，海水、木板、金属碎片和雨幕共同构成混乱灾难场面。
分镜10：最终镜头拉远，巨兽高高矗立在狂暴海面上，周围巨浪翻腾，渔船在前景或侧下方显得极其渺小。天空闪电再次劈下，短暂照亮巨兽庞大的轮廓、背部骨刺与翻涌海水，形成史诗级灾难怪兽电影海报般的终极画面。画面停留在最震撼的一刻，以巨物压迫感和末日感收尾。
配乐采用好莱坞灾难怪兽电影风格。开场以低沉环境音、深海般的低频轰鸣、稀疏鼓点和压抑弦乐营造暴风雨中的不安感；随着海面异动逐渐加入更强的低音脉冲、金属撞击感和不断堆积的弦乐张力；在巨兽即将浮出水面前，音乐进入几乎屏息般的悬停和持续上升；巨兽破浪而出时，爆发出巨大的铜管、重型打击乐和低频冲击，形成灾难级高潮；结尾以厚重、压迫、末日感极强的长音和鼓点收束，强化巨兽矗立海面的史诗感。
```

</details>

<a id="text-to-video-07"></a>
### 7. Cowgirl Refuels Her Horse

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-07#text-to-video-07)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Calm static wides meet sudden extreme close-ups as a pump nozzle spews grass, turning the absurd reveal into comedy.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/17b9ecb0-87d3-4601-8dde-295cbaeceec1" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Content summary
This is an event of cold humor and absurdity, a “refueling” set in a bright future wasteland with vivid colors. At a forgotten gas station resembling Route 66, a bored attendant receives a strange visitor: a cool, silent cowgirl riding a real horse. Just as the attendant assumes she is a passing lunatic, the cowgirl walks straight to the fuel pump, picks up the nozzle, and “fills up” her horse with fresh grass. This surreal sight leaves the worldly-wise attendant frozen in a state of cognitive dissonance.

Scene description and light aesthetics
Visual style: realistic, with high-saturation, high-brightness cinematic color grading that creates a sense of “clear” weather, setting the absurd story in an utterly normal, even pleasant environment.
Color aesthetics: strictly follows a bright “teal-orange” palette system.
Teal: the cloudless sky is a bright, clear blue (leaning cyan). The gas station's main building is in retro yellow-orange-blue colors, slightly faded. The fuel pump is faded retro red.
Orange: the ground is cracked, dried orange earth. The distant mountains show warm terracotta tones. The cowgirl's scarf or jacket is orange.
Characters and setting:
Cowgirl: cool, stylish, and taciturn. Wears a wide-brimmed cowboy hat. Wears durable work boots and jeans, with the dust of a long journey on her.
Horse: a real horse with a calm demeanor and ordinary coat color, seemingly unsurprised by any of this.
Gas station attendant: wears greasy blue work overalls and huge black sunglasses, leans listlessly on a chair with a toothpick in his mouth. He serves as the film's core “reaction shot” character.
Gas station: a classic Route 66-style station, with a small convenience store next to it, and a faded cola vending machine by the door, full of American retro feel.
3. Camera style description
The camera style is “Calm Observation & Absurd Close-up”:
A large amount of fixed medium shots and slow horizontal pans record the event from a very calm, objective perspective, with no emotional guidance.
When key absurd actions happen, the camera suddenly cuts to an extreme close-up, such as the moment grass sprays from the nozzle, or the attendant's frozen face. This abrupt magnification creates the laughs.
4. Storyboard description
0s–8s: Prologue: a boring afternoon
Fixed extreme wide shot. Blue sky, blowing sand. A gas station in faded yellow-orange-blue colors stands alone beside the road. In front of the station, an attendant in sunglasses lazily dozes in a chair. Everything is so quiet that only the wind can be heard.
Long shot. On the horizon, a cowgirl riding a horse slowly appears, breaking the stillness.
Medium shot. The attendant is startled awake by the sound of hooves. He adjusts his sunglasses, impatiently sits upright, and watches this odd pair, the toothpick in his mouth moving, his face clearly saying, “Another one asking for directions.”
8s–16s: Break: solemn, deliberate nonsense
The cowgirl says nothing. She swings off the horse with ease and, leading it by the reins, walks straight to an old-fashioned fuel pump. The horse skillfully lowers its head toward the pump.
The attendant's subjective view (slightly fisheye): the frame mimics his view through his sunglasses, in which the woman and horse look even stranger. He sees the cowgirl actually pick up the fuel nozzle.
Close-up. The attendant's brow furrows; he thinks she is playing a joke. He takes off his sunglasses, ready to scold her.
Slow-motion close-up: at the very moment he removes his sunglasses, he sees the cowgirl point the nozzle at the horse's mouth and pull the trigger.
16s–24s: Urgent: [Climax] the moment his worldview collapses
[Ultimate contrast]:
Close-up: the fuel nozzle. What spurts out is not gasoline, but streams of fresh, emerald-green grass, still beaded with water droplets!
Extreme close-up: the camera quickly cuts to the attendant's face, dumbstruck. His eyes are wide as bronze bells, his mouth slightly open, and the toothpick hanging from his lips has forgotten to move. His expression freezes, as if his entire worldview has been overturned in a single second.
Medium shot. The horse eats with great enjoyment, its eyes narrowing contentedly, then gives a satisfied, powerful flick of its tail. The dust kicked up by the tail lands squarely on the still-dazed attendant's face.
24s–30s: Ending: she rides off, leaving him stunned
The horse has been “filled up” with grass. The cowgirl hangs the nozzle back in place. She takes a few coins from her pocket, walks to the convenience store entrance, and tosses them with a “clink, clink” into a tin can on the counter.
She glances back at the attendant, still petrified, and the corner of her mouth under the brim of her hat seems to lift slightly.
[Final freeze]: she swings onto her horse and rides off into the distance.
The camera slowly pushes in on the attendant. He keeps the same dumbstruck pose, his face covered in dust, still holding the sunglasses he just removed, and the toothpick finally falls to the ground with a “plip.”
The frame freezes on his face, full of doubt about life. The film ends in absurd silence, with only the sound of the toothpick rolling across the ground as the wind passes.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
内容梗概
这是一场发生在色彩明亮的未来废土上、充满了冷幽默与荒诞感的“加油”事件。在一个被遗忘的、类似66号公路的加油站，百无聊赖的工作人员迎来了一位奇特的客人——一个骑着真马的酷酷女牛仔。就在工作人员以为这只是个路过的疯子时，女牛仔却径直走向加油机，拿起油枪，为她的马“加满”了新鲜的青草。这超现实的一幕，让见多识广的工作人员彻底陷入了认知失调的呆滞状态。
场景描述与光影美学
视觉风格: 写实风格，色彩处理上采用高饱和度、高亮度的电影调色，营造出一种“晴朗”感，让荒诞的故事发生在一个无比正常、甚至有点美好的环境里。
色彩美学: 严格遵循明亮的“青橙配色”体系。
青色（Teal）: 万里无云的天空是明亮、清澈的蔚蓝色（偏青）。加油站的主要建筑是复古的黄橙蓝配色，建筑微微褪色。加油机是褪色的复古红。
橙色（Orange）: 地面是龟裂的橙色干涸土地。远处的山脉呈现出温暖的赤陶色。女牛仔的围巾或夹克是橙色的。
角色与场景:
女牛仔: 形象酷飒，沉默寡言。戴着一顶宽檐牛仔帽。穿着耐磨的工装靴和牛仔裤，身上有长途旅行的风尘痕迹。
马: 一匹神态淡定、毛色普通的真马，仿佛对这一切早已司空见惯。
加油站工作人员: 穿着油腻的蓝色工装，戴着一副巨大的黑色墨镜，百无聊赖地靠在椅子上，嘴里叼着一根牙签。他是本片的核心“反应镜头”担当。
加油站: 经典的66号公路风格，旁边有一个小小的便利店，门口放着一台褪色的可乐贩卖机，充满了美式复古感。
3. 运镜风格描述
运镜风格是“冷静的旁观与荒诞的特写（Calm Observation & Absurd Close-up）”：
大量使用固定的中景镜头和缓慢的横移，以一种非常冷静、客观的视角来记录事件，不做任何情绪引导。
在关键的荒诞行为发生时，镜头会突然给到一个极端的特写，比如油枪喷出草的瞬间，或者工作人员呆滞的面部表情，通过这种突兀的放大来制造笑点。
4. 分镜描述
0s - 8s：序幕：无聊的午后
大全景（固定）。蓝天，风沙。一个复古的黄橙蓝配色微微褪色的加油站孤独地立在公路旁。加油站门口，一个工作人员戴着墨镜，懒洋洋地躺在椅子上打盹。一切都安静得只剩下风声。
远景。地平线上，一个骑着马的女牛仔缓缓出现，打破了这份宁静。
中景。工作人员被马蹄声惊醒，他扶了扶墨镜，不耐烦地坐直了身体，看着这个奇怪的组合，嘴里叼着的牙签动了动，脸上写满了“又是个问路的”。
8s - 16s：破：一本正经的胡闹
女牛仔没有说话，她利落地翻身下马，牵着马，径直走向一台老式的加油机。马儿熟练地将头伸到加油机旁。
工作人员的主观视角（略带鱼眼）: 镜头模仿他从墨镜后看出去的视角，那个女人和马的组合显得更加古怪。他看到女牛仔真的拿起了加油枪。
近景。工作人员的眉头皱了起来，他觉得这女人在寻开心。他摘下了墨镜，准备开口呵斥。
慢动作特写: 就在他摘下墨镜的瞬间，他看到女牛仔将油枪的喷嘴对准了马嘴，然后扣动了扳机。
16s - 24s：急：【高潮】认知崩溃的瞬间
【终极反差】:
特写: 油枪喷嘴。喷出的不是汽油，而是一股股新鲜翠绿、还带着水珠的青草！
极端特写: 镜头快切到工作人员那张呆若木鸡的脸上。他的眼睛瞪得像铜铃，嘴巴微微张开，叼着的牙签都忘记了动弹。他的表情凝固了，仿佛世界观在这一秒被彻底颠覆。
中景。马儿吃得津津有味，幸福地眯上了眼睛，然后心满意足地、有力地甩了一下尾巴。马尾扫起的灰尘，正好扑了旁边还在呆滞的工作人员一脸。
24s - 30s：合：绝尘而去，留下呆滞
“加满”了草。女牛仔将油枪挂回原位。她从口袋里掏出几枚硬币，走到便利店门口，“叮叮当当”地扔进了柜台上的一个铁皮罐子里。
她回头看了一眼还在石化状态的工作人员，帽檐下的嘴角似乎微微上扬了一下。
【终极定格】: 她翻身上马，绝尘而去。
镜头缓缓推向工作人员。他依然保持着那个呆若木鸡的姿势，满脸灰尘，手里还捏着刚刚摘下的墨镜，嘴里的牙签终于“啪嗒”一声掉在了地上。
定格在他这张怀疑人生的脸上，全片在荒诞的寂静中结束，只留下一阵风吹过时，牙签在地上滚动的声音。
```

</details>

<a id="text-to-video-08"></a>
### 8. Explorer and the Glowing Giant Plant

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-08#text-to-video-08)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Four shots move from cautious approach to awe as a huge translucent plant rises from a glowing lake.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/fe741e2c-72d4-431e-b614-e7b836e069a0" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
A 3D animated fantasy short with four camera setups, moving from cautious approach to a shocked stare, with a mood of quiet, mystery, and wonder. The setting is a shallow lake in a night forest, an outdoor natural space. The lake surface is calm, surrounded by tall trees, with glowing floating petals scattered across the water and a faint mist in the air. The main colors are teal-blue, dark green, and moonlight white, a predominantly cool palette, with local glowing plants providing bluish-white highlights, medium saturation, and medium-high contrast. The subjects are an explorer boy and a giant transparent plant in the lake's center. The explorer looks young, slim-built, with short light-colored hair and freckles, wears light adventure gear, holds a small oil lantern, and has a soft face. Shot one is a medium-long establishing shot: the explorer moves from the right side of the frame, stepping on stones that rise above the water toward the lake's center, while the camera slowly pushes in. Shot two cuts hard to a medium shot from behind; the camera keeps tracking his movement, shallow ripples spread outward, and a few floating petals are gently pushed aside. Shot three cuts to a medium shot of the lake's center: increasingly dense concentric ripples appear on the water, and a huge transparent plant slowly rises, with liquid-like light flowing inside it. As its branches and leaves unfold, they cast swaying reflections. Shot four cuts to a side medium close-up: the explorer stops, with one foot in front of the other on two stones, lowering his lantern. His face changes from wariness to wide-eyed surprise, his gaze fixed on the giant transparent plant at the lake's center. The audio includes ambient sound and music, with no speech. There are only night insect calls, faint water sounds, low-frequency resonance as the plant rises, and ethereal synthesizer and strings. Requirements: clear lake-surface ripples, glowing material, camera push-in, the subject's performance, and cool night lighting and shadows.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
一段共4个镜头场景的3D动画奇幻短片，从谨慎接近到巨大生物显现再到震撼凝视，情感表达为安静、神秘、惊叹。场景环境为夜色森林中的浅湖，室外自然空间，湖面平静，周围高树包围，漂浮发光花瓣分布于水面，空气里有淡薄雾气。主色调为青蓝、墨绿、月白，冷色调为主，局部发光植物提供青白色高亮，饱和度中等，对比度中高。主体为探险少年与湖中心巨大透明植物。探险少年年龄偏少年，身形纤细，短浅色发，有雀斑，穿轻便探险服，手持小油灯，面部柔和。镜头一为中远景定场，探险少年从画面右侧踩着露出水面的石头向湖中心移动，镜头缓慢前推；镜头二硬切到背后中景，镜头继续跟踪他的移动，浅水波纹向四周扩散，少量漂浮花瓣被轻轻推开；镜头三切到湖心中景，水面出现越来越密集的同心波纹，一株巨大透明植物缓慢升起，内部像液态光在流动，枝叶展开时投下摇曳反光；镜头四切到侧面中近景，探险少年停下两只脚一前一后踩在两块石头上、放低手灯，面部由警惕变成睁大双眼的惊讶，视线凝视湖中心巨大透明植物。音频类型包含环境音与音乐，无语音内容，仅有夜间虫鸣、轻微水声、植物上升时的低频共鸣和空灵合成器与弦乐。要求明确湖面波纹、发光材质、镜头推进、主体表演和冷色夜景光影。
```

</details>

<a id="text-to-video-09"></a>
### 9. White-Dress Girl at the Cliff

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-09#text-to-video-09)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Backlit sky shifts from deep blue to orange as a slow-motion leap blooms her torn dress like a flower.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/d6be8d09-e12f-4490-ab4a-aba0ae3209b4" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
This is an exquisite Japanese-style 2D cartoon animated short. The emotional climax needs delicate handling, especially the use of the sky's color gradient and cloud-layer light and shadow. It needs dramatic backlighting, and the composition should use strong perspective depth to emphasize the smallness and determination of the character in a vast scene. A vast cliff edge, with a surging sea of clouds in the distance and a faintly visible city beyond. The sky shows dramatically changing gradient colors, transitioning from deep blue to orange-red, with the edges of the clouds glowing with golden outlines. Violent wind sweeps petals and shredded leaves from the ground into the air, dancing all around.
Character design: a lonely girl with silver-white long hair violently streaming in the wind, wearing a torn white formal dress, with fine crack-like glowing lines at the hem, a face as pale as porcelain, and eyes holding deep struggle and resolve.
The shot opens on an extreme long shot: the character's figure looks especially small and lonely in the vast world. The camera slowly pushes in to a medium shot of her, her hem and hair violently whipping and curling in the wild wind. She slowly raises her head to look at the surging sea of clouds, and an extreme close-up catches the complex emotions in her eyes: fear and struggle, finally transforming into determination. She takes a step forward and stands at the very edge of the cliff. The camera switches to fast orbiting shots, with the colors of the sky flowing and shifting around her body. Finally, at the moment she leaps off the cliff, the footage enters slow motion: her hem blooms and spreads in the air like a flower, and white light particles rising around her body drift down like feathers.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
这是一段精致的日式2D卡通动画短片，对情绪高潮场景需要有细腻处理，尤其是天空色彩渐变与云层光影的运用。需要有戏剧化的逆光效果，在空间感上采用带强烈透视纵深的构图，强调人物在辽阔场景中的渺小与坚定。悬崖边缘的辽阔场景，远处是翻涌的云海与远处若隠若现的城市，天空呈现出剧烈变化的渐变色彩，从深蓝逐渐过渡到橙红色，云层边缘泛着金边，狂风卷起地面的花瓣与碎叶漫天飞舞。
主角设计：孤独少女，银白色长发在风中剧烈飘散，身穿破损的白色礼裙，裙摆边缘有细微的裂纹状发光纹路，脸色苍白如瓷，眼神中蕴含着深深的挣扎与决绝。
镜头以极大远景开场，主角的身影在辽阔天地间显得格外渺小孤独，镜头缓慢推进至她的中景，裙摆与发丝在狓风中剧烈飘散翻卷。她缓缓抬起头望向翻涌的云海，脸部特写捕捉她眼中闻过的复杂情绪——恐惧、挣扎，最终转化为坚定。她向前迈出一步站在悬崖最边缘，镜头切换为高速的环绕拍摄，天空的色彩在她周身流转变化，最终她纵身跃下的瞬间画面进入慢镜头处理，裙摆如花朵般在空中绽放展开，身躬周围泛起的白色光点如羽毛般飘散。
```

</details>

<a id="text-to-video-10"></a>
### 10. Exhausted Boxer Keeps Punching

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-10#text-to-video-10)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Continuous punches on a heavy bag show recoil and a sweaty, pained face, hinting he is struggling.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/88139017-789b-49f6-8ff0-619ba79d0589" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
A 2D animation with a Japanese sports-anime texture, 30 seconds. In a boxing training gym, a short-haired black athlete throws punches continuously. His gloves strike the heavy bag, which shows clear shaking and rebound, but he seems to be running out of strength: his expression is pained, he is sweating, and he looks as if he is trapped in some kind of predicament.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
日式运动番质感的2d动画，30秒。拳击训练场里，黑色短发的运动员连续出拳，手套击打沙袋时产生明显的震动回弹，但他似乎有些乏力，表情痛苦，流着汗，像是陷入在什么困境中一样。
```

</details>

<a id="text-to-video-11"></a>
### 11. Cold Smile Before the Void

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-11#text-to-video-11)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Single shot slowly rises as a dark-fantasy villain speaks English lines while a palm nebula bursts apart.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/8f04cc35-8df3-49b8-bc68-aa6abbcc5dfd" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
A 30-second 3D animated short in a dark-fantasy genre, single shot, in a dim stone-brick interior. A cold, handsome man with violet eyes, dark-blue silver streaked tangled hair, ink-black crystal horns, and pale cold skin; dark purple star-orbit magic runes cover his forehead. He wears an extreme-night-blue brocade high-collar windbreaker over a black silk shirt, with a dark silver amethyst ear cuff on his left ear.
Scene: dominated by cold white moonlight at night, hard light, high-contrast low-key lighting, front-side light effect. In the background, two blurred figures and the flickering warm yellow of firelight, with faint blue dust particles floating.
Camera: medium-close shot, slightly high angle, shallow depth of field locking onto the character on the left. As the monologue goes on, the camera slowly and gently tilts up to eye level.
Action: the man stands at an angle, lowers his head with a contemptuous smile, glances sideways at his palm, then turns toward the camera. Lifting his head, he says in a cold, magnetic voice: “Ripe enough for the void.” He spreads the five fingers of his left hand open, and a dark shadow nebula vortex gathers in his palm, as he says: “Your soul, a mere spark for me to extinguish.” He suddenly clenches his fist, the nebula bursts and dissolves into dark purple mist and blue star dust, and finally he shows a cruel smile, his dark purple gradient nails slightly extended.
Accompanied by void-resonance sound effects and the sound of energy rupturing, the English voice of a young villain runs through the entire piece.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
3D动画短片，30秒，暗黑奇幻题材，单镜头，昏暗石砖室内场景。高冷俊美男子、紫罗兰色眼睛、墨蓝银挑染乱发、墨色晶角、苍白冷肤，暗紫星轨魔纹布满额角，身穿极夜蓝织锦立领风衣，内搭玄色丝质衬衫，左耳佩暗银紫水晶耳骨夹。
场景：夜晚冷白月光硬光主导，高对比低调打光，前侧光效果，背景两个模糊人影与暖黄火光摇曳，幽蓝尘埃粒子漂浮。
镜头：中近景微俯视，浅景深锁定左侧人物，随独白极缓速上摇至平视。
动作：男子斜侧而立，垂头轻蔑一笑，侧视手掌后转向镜头，抬头以阴冷磁性声线道："Ripe enough for the void." 左手五指摊开，掌心凝聚暗影星云漩涡，说到："Your soul, a mere spark for me to extinguish." 猛然攥拳，星云爆裂消散为暗紫雾气与幽蓝星屑，最终露出残忍笑容，暗紫渐变指甲微展。
配合虚空共鸣音效与能量破裂声，英文青年反派语音贯穿全程。
```

</details>

<a id="text-to-video-12"></a>
### 12. UFO Abducts a Farm Cow

`wan3.0-text-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-12#text-to-video-12)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Cold painterly farm scene: a UFO's green beam lifts a cow while a boy watches from an upstairs window.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/899498a9-399a-4b8b-84d4-453ab04fc1b4" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
A hand-painted style animation with oil-painting brushstrokes and a cool color tone. On an American suburban farm, an alien flying saucer flies in from the distance. A green beam of light shoots down from beneath the saucer and sucks a cow on the farm into the sky. In a second-floor room not far away, a little boy sees the whole thing.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
手绘风格动画，油画笔触，色调偏冷，美国郊外农场上，一个外星飞碟从远处飞来，飞碟下射出绿色光柱，将农场中的一只奶牛吸走了，不远处二楼房间中的小男孩看到了这一幕。
```

</details>

<a id="text-to-video-13"></a>
### 13. Five-Member Monochrome Dance Showpiece

`wan3.0-text-to-video` · 25s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-13#text-to-video-13)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Five dancers in monochrome hard light hit each beat, with cuts between wide fan formations and slow-motion close-ups.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/b05941ef-e8d4-448a-a98c-952dd1328d6c" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
A hardcore dance showpiece by a five-member Korean girl group in an MV-concept style. Pure black and pure white seamless studio backdrops alternate, with a black-and-white high-contrast hard-light fashion-photography texture. The music rhythm is industrial electronic bass with sudden stop-style heavy drum hits. The five members are spaced in staggered, magazine-cover-style layers. The center member has an lazy yet aura-filled presence, with sharp eyes, short slightly damp hair pressed to the scalp, and long silver-painted nails stretched out elegantly. On the left, one member wears a black wide-brimmed top hat with brows lowered, and long wavy hair falling to the waist. On the right, one member has a golden buzz cut showing a sharp jawline. The two front members, one with black shoulder-length straight hair and one with highlighted long curly hair, both share a cold, high-brow expression with lips pressed shut and eyes glancing at 45 degrees below the lens. All five wear black velvet top hats, or off-shoulder satin gowns, or leather openwork blazers with silver belt buckles. The satin hems and openwork cuts will deform specifically as they spin and swing their arms. The floor is dark reflective tile creating a sense of delayed reflection, but it is not a mirror wall. On the first beat of the drum, all five hold a sculptural back-facing starting pose, with heads swinging 90 degrees in unison to reveal profiles, and the fingertips adjusting their top hats to complete a one-beat freeze at their preparatory positions. At the stressed beat of the first lyric line, the center member slowly draws the index finger from the collarbone downward, then sharply stops for two beats at the end of the phrase, while the two side members each shift inward with their shoulders to complete a small hit. At the syncopated point of the second lyric line, all five perform symbolic positional hand gestures in unison and use the silver nails to trace short arcs. Entering the interlude, the energy starts from the center member's fingertips, passes through the arms to the shoulders, and sinks into the waist and hips, completing one full body wave, then successively passes to the members on each side, forming a chain of transmission, taking four beats in total. The formation, through this, slides from a staggered loose arrangement along an arc into a diagonal line, and the side members use a sideways yielding motion as they pass beside the center member to cross without interrupting the central line of sight. At the densest drum point of the chorus, the five members burst apart from the diagonal into a maximally open fan shape, the satin hems flinging out fan-shaped arcs as they turn, and the side waist of the openwork blazer shows its lines as they raise their arms. At the instant of the hair flip, the camera abruptly cuts from a fixed wide-angle, tilted composition to a high-frame-rate slow-motion close-up, capturing the tension of hair hanging in the air and fabric flipping, then stops suddenly and keeps the chest breathing tremble visible for two beats. Entering the bridge, the center member steps back two steps to yield, and the right-side long-haired member crosses behind her with a cross-step to complete a center-position rotation within five beats. The new center leans back and then uses momentum to rise, completing one solo display move. In the outro, the five members quickly return to position along opposite paths, gathering into a V formation. The camera slowly pushes in with an orbiting follow to the new center's face, freezing at the instant her deadly gaze meets the lens, while the lighting switches from top light to backlit rim light, sustained for two beats to close. Across the whole piece, the camera plan is: a fixed medium shot at the opening mimicking a cover composition; close-ups of body parts in segments with the hand positions; an orbiting follow with wave transmission during the interlude; a wide-angle fan expansion during the chorus, then an abrupt cut to a high-frame-rate close-up; an orbiting follow around the new center in the bridge; and a slow push-in freeze at the ending. The whole piece keeps the black-and-white high-contrast hard-edge lighting and a cold studio texture, with no soft light and no filters, and the reflective edges of the fabric and nails remain clearly visible throughout.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
MV概念风的五人韩国女团硬核大片舞段，纯黑与纯白无缝影棚交替作底，色调为黑白高对比硬光时尚摄影质感，音乐节奏为工业电子贝斯配合骤停式重鼓点，五人以杂志封面式错落层次站位分布，居中者气场慵懒眼神锐利、短发微湿贴颅、长指甲银色美甲修长延展，左侧一人黑色宽檐礼帽压低眉骨、波浪长发垂至腰侧，右侧一人金色寸头露出锐利下颌线，前排两人分别为黑色齐肩直发与挑染长卷发、皆以高眉骨冷艳表情基调统一嘴角紧闭眼神斜视镜头下方四十五度，五人皆着黑色天鹅绒礼帽或露肩缎面礼服与皮质镂空西装外套配银色皮带扣，缎面下摆与镂空剪裁将在旋转与甩臂时随即产生具体形变，地面为深色反光地砖制造倒影延迟感但非镜面墙，鼓点第一响时五人保持雕塑式背对起势、头部同步甩转九十度露出侧脸并以指尖扶正礼帽完成预备点位定格一拍，第一句歌词重音处居中者以食指从锁骨向下缓抹并在句尾骤停两拍同时两侧成员各自以肩部隔离向内错动完成小幅卡点，第二句切分点处五人指尖同步做出符号化点位手势并借银色美甲划出短促弧线，进入间奏时能量从居中者指尖发起、经手臂传导至肩部再沉入腰胯完成一次完整body wave并向两侧成员依次接续形成连锁传导链、全程耗时四拍，队形借此从错落松散站位沿弧线滑步收拢为对角线，两侧成员经过居中者身侧时以侧身让位方式完成交叉不打断中心视线，副歌鼓点最密集处五人从对角线骤然甩开呈扇形最大化展开，缎面下摆随转身甩出扇形弧线、镂空西装侧腰随抬手露出线条，甩发瞬间镜头由固定广角俯仰构图骤然切至升格慢动作特写捕捉发丝悬空与布料翻卷的瞬间张力，随后骤停并保持胸腔呼吸颤动可见两拍，进入桥段时居中者后退两步让位、右侧长发成员经交叉步于其身后穿过完成五拍内的中心位轮转、新中心以后仰再借力起身完成一次独立展示动作，收尾段五人沿相反路径快速归位收拢为V字队形，镜头以环绕跟随缓慢推近至新中心面部，定格于其眼神杀直视镜头的瞬间同时灯光由顶光切换为逆光轮廓光两拍延续收束，全程镜头分配为开场固定中景仿封面构图、分部位段落切近特写点位手、间奏环绕跟随波浪传导、副歌广角扇形展开后骤切升格特写、桥段环绕跟随新中心、结尾缓慢推近定格，全片维持黑白高对比硬边光影与冷调影棚质感，无柔光无滤镜，布料与美甲反光边缘始终清晰可辨。
```

</details>

<a id="text-to-video-14"></a>
### 14. Plush Space Escape from a Whale

`wan3.0-text-to-video` · 20s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-14#text-to-video-14)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

A plush spaceship flown by three toy animals escapes a giant plush whale through a button asteroid belt across eight timed segments.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/a9837e57-685a-43af-9cb7-d1c08d68067b" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Generate a 20-second, 16:9 ultra-widescreen plush space adventure clip.

A spaceship made of plush fabric, buttons, zippers, and stuffing escapes at high speed through a universe made of giant yarn planets, fluffy nebulas, and plush giant beasts. Three small plush animals fly the ship: a rabbit, a fox, and a crow.

A giant interstellar whale, covered in long deep-blue fur, with eyes like two glass buttons, chases the ship out of the nebula.

The overall look uses ultra-fine plush materials, cinematic space scale, cute shapes with strong contrast to dynamic action, exaggerated FPV camera moves, and realistic soft-body physics.

20-second dynamic timeline
0–3 seconds | Zipper ship launches like a catapult

The camera is inside the plush spaceship, where the cockpit is made of stitching, buttons, and fabric instruments.

A red warning button flashes rapidly. The rabbit pulls down a huge zipper control lever, and the front hatch splits open like a cloth sack.

The camera rushes backward from the cockpit at high speed, passing through the zipper hatch to the outside of the ship. The ship is catapulted up from the knitted crater of a yarn planet.

3–6 seconds | High-speed orbit low over the yarn planet

The camera hugs the ship's stern, flying low over the planet's surface.

The ground is woven from enormous yarn:

knitted mountain ranges sweep past below at high speed;
loose yarn ends sway like a forest;
the ship dodges sharply left and right;
the camera continuously tilts sideways and rolls;
the thrusters blow out a tail of white cotton wisps.
6–8.5 seconds | The giant plush whale appears

The fluffy nebula suddenly parts to either side, and a giant deep-blue plush whale rushes out from behind.

Long fur on the whale's body is blown backward by high-speed airflow, and its glass-button eyes reflect the light of the planets.

The camera quickly orbits halfway around the ship, switching to an inverted flying view so that the beast keeps growing larger behind the ship.

8.5–11 seconds | Through the button asteroid belt

The ship enters an asteroid belt made of thousands of giant buttons.

The camera follows the ship in continuous high-speed S-shaped movements:

through the gap between two spinning buttons;
skimming along the edges of the button holes;
diving into the inside of a transparent button;
emerging from the other side;
the giant whale bites and smashes buttons with its mouth, bursting out fabric scraps and loose threads.

11–13.5 seconds | Swallowed into the whale's mouth

The route ahead is blocked, and the ship suddenly turns toward the whale's open mouth.

Inside the whale's mouth is like a huge plush toy box:

its fluffy teeth are soft yet enormous;
floating blocks, plush dolls, and bells keep colliding;
the camera rolls continuously in the narrow space;
the ship sprints low over the tongue's surface;
the fluff on the tongue produces violent ripples.

13.5–16 seconds | Escape through the zipper on its back

The ship spots a huge golden zipper along the whale's body.

The fox character presses a button, and the ship fires a line hook to pull the zipper open. The camera pushes forward at high speed along the zipper teeth, which open to either side, revealing the outer starry sky.

The ship bursts out from the whale's back, while the camera completes a backward flip at the same time.

16–18 seconds | The whale's soft body collapses

After the zipper opens, the whale slowly flattens like a plush toy that has lost its stuffing, but no one is harmed.

A great cloud of white cotton spews out of the zipper, forming a huge soft shockwave. The camera and the ship are pushed forward by the wave of cotton.

18–20 seconds | Through the nebula and a hero freeze

The ship bursts out of the cotton cloud and enters a pink-purple fluffy nebula.

The camera orbits fast from the ship's side to an inverted flight directly in front, and through the cockpit glass, the three plush characters can be seen excitedly hugging one another.

The ship flies past above the frame toward a colorful button sun, and the clip ends.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
生成一支 20 秒、16:9 超宽银幕比例的毛绒宇宙冒险片段。

一艘由毛绒布、纽扣、拉链和填充棉制成的宇宙飞船，在由巨大毛线行星、绒毛星云和布偶巨兽组成的宇宙中高速逃亡。驾驶飞船的是三只小型毛绒动物：兔子、狐狸和乌鸦。

一只覆盖深蓝长绒毛、眼睛像两枚玻璃纽扣的巨大星际鲸兽，从星云中追赶飞船。

整体采用 超精细毛绒材质、电影级太空尺度、可爱外形与强烈动作反差、夸张 FPV 运镜和真实软体物理。

20 秒动态时间轴
0—3 秒｜拉链飞船弹射起航

镜头位于毛绒飞船内部，驾驶舱由缝线、纽扣和布料仪表组成。

红色警示纽扣快速闪烁。兔子拉下一条巨大拉链控制杆，飞船前方舱门像布袋一样裂开。

摄影机从驾驶舱高速后退，穿过拉链舱门来到飞船外部。飞船从一颗毛线行星的针织环形山中弹射升空。

3—6 秒｜贴着毛线行星高速绕行

镜头紧贴飞船尾部，沿行星表面低空飞行。

地面由巨大毛线编织而成：

针织山脉从下方高速掠过；
松散线头像森林一样摆动；
飞船左右大幅闪避；
摄影机连续侧倾和滚转；
推进器喷出白色棉絮尾流。
6—8.5 秒｜巨型毛绒鲸出现

绒毛星云突然向两侧分开，巨大深蓝毛绒鲸从后方冲出。

鲸体表面长绒毛被高速气流吹向后方，玻璃纽扣眼反射行星光芒。

镜头快速绕飞船半圈，改为倒飞视角，让鲸兽在飞船后方不断放大。

8.5—11 秒｜穿越纽扣小行星带

飞船进入由数千枚巨大纽扣组成的小行星带。

摄影机跟随飞船进行连续高速 S 形运动：

从两枚旋转纽扣之间穿过；
贴着纽扣孔洞边缘掠过；
穿进一枚透明纽扣内部；
从另一侧冲出；
巨鲸用嘴撞碎纽扣，产生布屑和线头爆发。
11—13.5 秒｜被鲸兽吞入口中

前方路线被封锁，飞船突然转向巨鲸张开的嘴部。

鲸兽口腔内部像一个巨大的毛绒玩具箱：

绒毛牙齿柔软却巨大；
悬浮积木、布偶和铃铛不断碰撞；
摄影机在狭窄空间连续滚转；
飞船贴着舌面低空冲刺；
舌面绒毛产生剧烈波纹。
13.5—16 秒｜从背部拉链逃出

飞船发现巨鲸体内一条巨大的金色拉链。

狐狸角色按下按钮，飞船射出线钩拉开拉链。摄影机沿拉链齿高速推进，拉链向两侧打开，露出外部星空。

飞船从巨鲸背部冲出，镜头同时完成一次向后翻滚。

16—18 秒｜鲸兽软体坍缩

拉链开启后，巨鲸像泄掉填充棉的毛绒玩具一样缓慢变扁，但不发生伤害。

大量白色棉花云从拉链中喷出，形成巨大柔软冲击波。摄影机和飞船被棉花浪推向前方。

18—20 秒｜穿越星云与英雄定格

飞船冲出棉花云，进入一片粉紫色绒毛星云。

摄影机从飞船侧面高速环绕至正前方倒飞，透过驾驶舱玻璃看见三只毛绒角色兴奋地抱在一起。

飞船从镜头上方掠过，向一颗彩色纽扣太阳飞去，结束。
```

</details>

<a id="text-to-video-15"></a>
### 15. Flying Apsara vs Vajra Warrior

`wan3.0-text-to-video` · 18s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-15#text-to-video-15)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

A one-take, Dunhuang-style duel in a golden light column: an apsara dancer and a vajra warrior clash over four timed segments.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/959501cb-da7f-4132-a9f2-a7e3838faa7e" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
One continuous take, dynamic tracking with an orbiting mixed perspective, 16:9 frame, CG animated film texture. The character's face is refined and smooth, with no pores and no skin texture, and simple, beautiful facial lines. Colors are rich and full, with soft, warm lighting and dramatic contrast. 8K ultra-clear, shallow depth of field, motion blur, with a palette of warm gold and malachite green, and warm golden light columns in a dark cave. The score is in a Dunhuang style, with low, deep drumbeats intertwined with pipa strings, the rhythm accelerating as the duel escalates.

The deep interior of a dark grotto, nearly pitch black. In the exact center, a giant golden Buddha statue glows with amber warm light in the darkness, its compassionate features faintly visible. A crack in the dome lets a single column of warm golden light fall in, with golden dust particles slowly rotating within the beam. The walls are sunk in darkness, and only the outlines of malachite green and vermilion from the murals can be faintly made out. The cave is empty, and its echoes are deep and long.

Within the light column, a flying apsara dancer: a melon-seed face, willow-leaf eyebrows, phoenix eyes with the outer corners lifted, skin like warm jade, smooth and fine, lips slightly parted, and a single vermilion floral mark on the brow center. Her jet-black high bun is coiled, with two loose strands falling by her temples, and on top of her head is a three-tiered golden lotus crown inlaid with turquoise beads, with gold chain tassels falling down to her ears. Three strings of jewelry layer down across her chest: the topmost is a fine pearl necklace, the middle is alternating turquoise and agate beads, and the bottom is a golden lotus pendant. She wears a malachite-green short high-collared shirt with narrow sleeves, with golden scroll-grass patterned trim at the collar and cuffs, amber-gold high-waisted wide-leg trousers with golden rings gathering the cuffs, and a wide vermilion satin sash tied in a bow at the waist, its tails hanging to the knees. Over each shoulder is a three-meter-long ribbon: vermilion red on the left and malachite green on the right, about twenty centimeters wide, edged with fine gold thread, its color rich and its lines flowing when extended. Her arms wear golden armlets carved with lotus patterns, and she wears three golden bracelets on each wrist. She holds a lacquered pipa in reverse, its body painted with golden phoenixes and its headstock carved with cloud scrolls. She is barefoot, with golden bells tied at her ankles.

In the shadows, a vajra warrior: a broad square face with bronze-bell eyes wide open, a broad nose with thick nostril wings, mouth corners turned down to reveal the lower fangs, three vertical lines on the forehead, and a fierce expression. His short reddish-brown hair stands upward like flames. His bare upper body has clearly defined, block-like muscles, deep bronze skin, with ochre-gold reflections at the highlights. A wide ochre-gold brocade sash runs diagonally across his chest from the left shoulder to the right ribs. His arms have golden armbands carved with angry dragon patterns, and dark-brown wrist guards on his forearms. Around his waist is a dark-ochre battle skirt reaching above the knees, with embossed flame patterns on its surface and bronze rivets arranged along the edges. His calves are wrapped in cross-tied straps of dark brown. His feet are bare and broad.

Segment 0–3 seconds, slow push-in plus slight rise: the camera slowly pushes in from darkness into the grotto, and the warm golden light column illuminates the center. The apsara dances within the light column, turning with a three-bend body movement, her pipa held in reverse behind her back. Her vermilion and malachite ribbons whip out with her spins, flipping through the warm light and drawing smooth arcs, the gold edging flickering, and the ankle bells ringing in fragmented sounds. The vajra warrior steps out of the shadow of the Buddha statue, his bare foot striking the ground with a thunderous impact that echoes and grows across the dome. The stone floor beneath his feet cracks in a radial pattern, and gold lacquer flakes from the statue's surface shake loose and tumble, spinning through the light column. The apsara stops her spin and faces the vajra warrior, swinging the pipa from behind her back to the front to hold it horizontally across her body. Her jewelry sways slightly with her movement, and the echo of her ribbons still billows behind her.

Segment 3–7 seconds, arc-shaped orbit plus lateral tracking: the vajra warrior growls and charges at the apsara, swinging a fist straight down, and the wind of his punch pushes aside the golden dust in the light column, forming visible shock ripples spreading outward. The apsara dodges by sliding sideways in a three-bend body movement, and her vermilion ribbon whips out, wrapping around the vajra warrior's forearm and pulling taut, with the gold edging of the wrapped section flickering in the warm light. The vajra warrior pulls back hard to drag the apsara closer, and she uses that force to spin her body and block his second punch horizontally with the pipa. The pipa's soundboard cracks, a string snaps with a sharp trembling note that echoes across the dome, and fragments of the golden phoenix paint fly apart. Using the rebound from the block, the apsara arches backward into an aerial flip, her malachite short-shirt hem and ribbons unfurling in the turn into vivid arcs of colored band. Her two feet strike the vajra warrior's chest, and his ochre-gold sash snaps and flies off. The vajra warrior staggers back and collides with the statue's toe, and gold lacquer flakes fall in the warm light, spinning down like a rain of golden debris. The apsara lands on one knee, steadying herself, the broken pipa still held in her hand, and her jewelry and gold armlets jingle with broken chimes.

Segment 7–11 seconds, rapid push-pull plus steep high overhead shot: the vajra warrior roars and slams both fists into the ground, and the shock wave spreads outward from the impact points, pushing the loose stones away, and the impact travels to the walls, making the pigment of the murals in the darkness flake and crumble. The apsara leaps up and steps onto the Buddha statue's palm, using it as a springboard to bounce and spin, while her vermilion ribbon sweeps across the vajra warrior's face, its tip snapping across his cheek. The vajra warrior grabs the ribbon and yanks hard, tearing it, and loose threads of the ribbon fly from the broken end on the apsara's shoulder, clearly visible in the warm light. The camera rises sharply to a high overhead shot, showing two figures fighting in the warm golden light column below, one soft and one hard, with rhythms alternating, and the ribbon fragments and gold lacquer flakes spinning and floating and glittering in the light column.

Segment 11–15 seconds, steep dive plus ground-level tracking: the apsara hurls the broken pipa remains at the vajra warrior's face, and he smashes them with a punch, the vermilion lacquer fragments and broken strings bursting apart in the warm light. Taking advantage of the moment his view is blocked, the apsara spins in close and strikes his waist and ribs with both palms, a dull impact echoing, and the massive body of the vajra warrior crashes into one corner of the Buddha's pedestal, and the great Buddha slowly tilts, emitting a sustained low groan of structural stress. The vajra warrior rises from the rubble for one final charge, and the apsara leaps forward to meet him with a kick. Both strike each other at the exact center of the light column at the same instant, the sound peaks and then drops into a moment of silence. The impact throws up a storm of debris, and the gold lacquer flakes and ribbon fragments in the warm light column rotate slowly and sink down. Both step back to steady themselves, breathing hard, and the remaining ribbons keep billowing in the aftershock, while the rubble continues to rustle down.

Do not copy the same character. The apsara dancer and the vajra warrior must have completely different body types and temperaments. Facial features must stay refined and undistorted, with an animated-character texture, smooth faces with no pores, normal body structure, and consistent costume and jewelry styling throughout.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
一镜到底，动态跟拍环绕混合视角，16:9画幅，CG动画电影质感，角色面部精致光洁无毛孔无皮肤纹理，五官线条简练优美，色彩浓郁饱满，光影柔和温暖带戏剧对比，8K超清，浅景深，动态模糊，暖金与石绿宝石色调，暗黑石窟中暖金光柱。低沉鼓点与琵琶弦音交织的敦煌风格配乐，节奏随对决升级加速。
幽暗石窟深处接近全黑，正中一尊巨大金色佛像在暗处泛琥珀色暖光，面容慈悲轮廓隐约。穹顶一道裂缝射入一束暖金色光柱，光柱中金色光尘缓慢旋转。四壁壁画沉没在黑暗中仅隐约可辨石绿与朱砂色轮廓。石窟空旷，回声深远绵长。
光柱中一名飞天舞者：瓜子脸柳叶弯眉丹凤眼眼尾上挑，肤色如暖玉光洁细腻，朱唇微启，眉心一点朱砂花钿。乌黑高髻盘旋，鬓边垂落两缕碎发，头顶三层金莲花冠镶嵌绿松石珠，冠顶金链流苏垂落至耳际。三串璎珞层叠垂落胸前：最上层细密珍珠链，中层绿松石与玛瑙间隔串珠，最下层金莲花坠。穿石绿色交领窄袖短衫领口和袖口金色卷草纹边饰，琥珀金色高腰宽腿长裤裤脚收束金环，腰系朱砂红宽缎带蝴蝶结带尾垂落至膝。双肩各系一条三米长飘带左朱砂红右石绿色，飘带宽约二十厘米边缘金色细线滚边，舒展时色彩浓郁线条流畅。双臂金臂钏刻莲花纹，手腕金镯各三只。反手持一把朱漆琵琶，琴身绘金色凤凰，琴头雕卷云纹。赤足，脚踝系金铃。
暗处一名金刚武者：方阔面部铜铃大眼圆睁，鼻翼宽厚嘴角下撇露出下排獠牙，额头三道竖纹，表情凶猛。火焰状赤褐色短发向上竖起。赤裸上身肌肉块状分明，肤色深古铜，高光处泛赭金。胸前一条赭金色宽锦带从左肩斜系至右肋。双臂金色臂环刻怒龙纹，前臂暗褐色护腕。腰缠暗赭色战裙至膝上，裙面浮雕烈焰纹铜色铆钉沿边排列。小腿深褐色交叉绑带。赤足宽厚。
0-3秒，缓推+微升：镜头从黑暗中缓推进入石窟，暖金光柱照亮中央。飞天在光柱中以三道弯身法起舞，琵琶反持于背后，朱砂红和石绿飘带随旋转甩出在暖光中翻飞划出流畅弧线，金色滚边闪烁，脚踝金铃碎响。金刚从佛像阴影中一步踏出，赤足踏地震响在穹顶回荡放大，脚下石地放射状碎裂，震落佛像表面金漆碎屑在光柱中旋转坠落。飞天停住旋转面向金刚，琵琶由背后旋至身前横持，璎珞随动作轻晃，飘带余韵仍在身后翻卷。
3-7秒，弧形环绕+平移追踪：金刚低吼冲向飞天挥拳直砸，拳风推开光柱中金色光尘形成可见冲击波纹向外扩散。飞天侧身以三道弯身法滑步闪避，朱砂红飘带甩出缠住金刚前臂拉紧，缠绕处飘带金色滚边在暖光中闪烁。金刚用力回拽将飞天拉近，飞天借力旋身琵琶横挡金刚第二拳，琵琶面板碎裂琴弦崩断发出尖锐颤音在穹顶回荡，金凤凰彩绘碎片飞散。飞天借格挡反弹力后仰凌空翻转，石绿短衫下摆和飘带在翻转中展开成绚丽弧形色带，双足蹬中金刚胸口，赭金锦带断裂飞出。金刚踉跄后撤撞上佛像脚趾，金漆碎片震落在暖光中旋转如金色碎屑雨。飞天落地单膝跪稳，碎裂的琵琶仍握在手中，璎珞和金镯叮当碎响。
7-11秒，快速推拉+急升俯拍：金刚怒吼双拳捶地，震波从落拳点向外扩散推开地面碎石，冲击传至四壁使暗处壁画颜料簌簌碎落。飞天纵身踩上佛像手掌借力弹射旋转，展开的朱砂红飘带扫过金刚面部末端抽中面颊。金刚抓住飘带猛拽撕断，飞天肩部飘带断口处碎丝飘散在暖光中清晰可见。镜头急升至穹顶俯拍，下方暖金光柱中两个身影缠斗，一柔一刚节奏交错，飘带碎片和金漆碎屑在光柱中旋转飘浮闪烁。
11-15秒，极速俯冲+地面跟拍：飞天掷出琵琶残骸砸向金刚面门，金刚挥拳击碎，朱漆碎片和断弦在暖光中爆散。飞天趁金刚视线被遮贴身旋入双掌推中金刚腰肋，沉闷撞击声回荡，金刚庞大身躯撞向佛像底座崩塌一角，大佛缓慢倾斜发出结构应力的持续低吟。金刚从碎石中起身最后冲锋，飞天迎面飞身踢出。双方在光柱正中同时击中对方，声音达到峰值后骤然跌入一瞬沉寂。碰撞冲击掀起漫天碎屑，暖金光柱中金漆碎屑和飘带碎片缓慢旋转沉降，两人各自后退稳住身形喘息急促，剩余飘带仍在余波中翻卷不止，碎石仍在簌簌洒落。
画面中不要复制相同角色，飞天舞者与金刚武者体型气质完全不同。五官精致不变形、动画角色质感面部光洁无毛孔、身体结构正常、服饰珠宝造型全程一致。
```

</details>

<a id="text-to-video-16"></a>
### 16. Giant Dice on Havana Streets

`wan3.0-text-to-video` · 25s · 9:16 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-16#text-to-video-16)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

A 25-second vertical fashion film fades from black-and-white to color as a model kicks a giant dice, ending in yellow doodles.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/a8078dd8-5652-4c1e-b1f3-5e65df5b12dc" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Generate a 25-second, 9:16 vertical high-saturation summer street fashion short.

The whole video takes place in a city block with the character of Caribbean, Havana in Cuba, or an old Latin American quarter. The streets are narrow, the ground is paved with old stone slabs, and on both sides stand historic buildings in bright colors with slightly weathered surfaces:
coral-red walls;
orange-yellow facades;
teal-green doors and windows;
cobalt-blue wooden doors;
pink and magenta exterior walls;
old balconies, wrought-iron railings, and peeling plaster;
an occasional vintage yellow car parked in the distance;
bright, intense summer sunlight;
a slight humid heat and film grain in the air.

The lead is a young adult male with a slim build, short black hair, and a calm, confident temperament with a slightly aloof, model-like detachment.

The character's styling stays consistent throughout:
a white or cream-white long, fitted coat;
the coat reaches around the knees;
from the chest to the abdomen on the front, four to five groups of yellow arc, ring, or band decorations run vertically;
the yellow decorations look like soft cord straps sewn onto the garment;
the inner layer stays simple;
high-saturation cobalt-blue or royal-blue long trousers;
white shoes;
no hat;
do not change the hairstyle, the garment colors, or the number of yellow decorations.

The key prop throughout the whole film is a large black soft dice:
close to a cube;
the surface is black soft rubber, fabric, or matte plastic;
the six faces carry large white dots;
the size is close to the character's calf height;
it can be held, kicked, tossed, dragged, or set on the ground by the character;
the proportions and shape stay the same in every shot;
it must never become an ordinary small dice.

A small red title appears continuously or intermittently at the bottom of the frame:
color of summer
The title uses a retro bold serif or typewriter-style font with slightly wide letter spacing, in dark red or bright red. The text sits at the bottom center, small but eye-catching. Apart from this title, no other large blocks of copy appear.

1. Overall visual style
Color system
The first half of the frame uses a selective-color effect with a black-and-white background and colored characters:
buildings, streets, and passersby are high-contrast black-and-white;
the lead's white coat, yellow chest decorations, blue trousers, and black dice remain in color;
the red title stays in color;
the black-and-white sections carry silver-halide film grain and a slightly overexposed white sky.

As the middle section begins, the scene gradually returns to full color:
red, orange, yellow, blue, teal-green, and pink form intense contrasting colors;
the lead's white costume stays the brightest point of the frame;
the yellow decorations echo the warm colors of the city buildings;
the blue trousers and the teal-blue doors and windows create a warm-cool contrast.

The late pool scene uses:
teal-blue pool water;
coral-red buildings;
pink, green, and orange swimwear;
bright white sunlight;
high-saturation tropical summer colors.

2. Film and frame texture
The whole look simulates 1990s fashion photography, old film magazines, and summer travel footage:
visible but fine film grain;
slight fading;
slightly whitened highlights;
shadows carrying a small amount of blue-grey or warm-red color cast;
partial light leaks;
slight picture jitter;
a few dust specks, scratches, and frame-to-frame flicker;
film-style directional streaks in fast motion;
no modern ultra-sharp digital look.

Some frames can use:
a black film border;
rounded-corner framing;
contact-print style small photos;
slight misregistered color separation;
multiple exposures;
one brief overexposed frame.

3. Character performance and dynamics
The lead's movement is not a professional dance choreography, but sits between fashion posing, street improvised dance, and summer play.
Movement traits:
relaxed steps;
shoulders swinging naturally;
kicking the dice now and then;
slight crouching;
one foot placed near the dice;
both hands adjusting the yellow chest cord straps;
brief pauses facing the camera;
simple rhythmic interaction with the surrounding crowd;
restrained expression, but occasionally a faint smile.
The lead remains the visual center. Background crowd movement is livelier and freer, but must never block the lead.

4. Group characters and costume
In the middle section, four to six young men and women appear, dancing in the street with the lead or interacting around the dice.
The group costumes use high-saturation summer colors:
orange tank tops or loose tops;
green shorts;
pink patterned shorts;
teal sleeveless tops;
royal-blue trousers;
yellow or red accessories;
light summer clothing;
a mix of retro sporty and street styles.
Skin tones, hairstyles, and body types can be varied, but everyone should look real and natural, with no uniform model face.
Group movements:
side steps;
lifting legs;
slight turns;
crouching around the dice;
clapping hands;
looking at one another;
rushing past close to the lens;
forming a sense of street festival and improvised play.

5. Hand-drawn yellow motion graphics
In the later part and ending of the video, a large amount of bright yellow hand-drawn graphics are layered over the footage.
The graphic language includes:
uneven-width yellow crayon lines;
hand-drawn rings;
continuous spirals;
arrows;
wavy lines;
speed lines;
half circles;
broken short strokes;
the chest cord straps from the yellow decorations, enlarged, duplicated, and extended into space.
Motion:
yellow lines are drawn rapidly along the character's outline;
they grow outward from the yellow chest decorations;
rings rotate around the head, arms, and legs;
yellow arc trails appear on the ground;
radial lines appear at the frame edges;
lines may briefly block the character but must not cover the face for long;
all doodles have genuine hand-drawn wobble and are not precise vector UI.

6. Camera language
The whole film mixes four main camera styles.
Low-angle street tracking
the camera sits at waist or knee height;
the character walks toward the lens from far down the street;
the stone slabs form strong depth;
the buildings converge upward;
slight handheld or stabilizer tracking;
a fashion documentary feel.
Frontal telephoto portrait
the character walks toward the lens, centered;
the background is slightly compressed;
the lead's face and yellow decorations are clear;
the surrounding street is softly blurred;
the camera slowly dollies back.
Circular fisheye lens
extreme super-wide angle;
a black circular vignette forms around the frame edges;
the central street is exaggeratedly stretched;
legs, arms, and dice close to the lens are enlarged;
buildings bend toward the frame edges;
used for the group dance and the final doodle climax.
Film contact-sheet layout
a full-frame black background;
two to three small vertical photos or moving frames arranged in the center;
each frame has a white border or film edge;
the small frames appear in turn showing the character walking, kicking the dice, and street crowds;
the red title is kept at the bottom.

7. 25-second detailed timeline
0–3 seconds | The colored lead in a black-and-white street
The frame opens on a black-and-white long shot of a narrow old-town street.
The buildings on both sides, the stone ground, and the background passersby are all high-contrast black-and-white. The lead walks in from the left edge of the frame or from deep in the street, and only these elements keep color:
the white long coat;
the yellow arc decorations on the chest;
the blue long trousers;
the black dice with white dots;
the red title "color of summer" at the bottom.
The camera slowly dollies back, directly in front of the character. The lead holds the large black dice and walks calmly toward the camera, glancing to one side now and then.
The frame carries clear film grain, slight overexposure, and fine jitter.

3–5 seconds | The lead approaches the camera in a fashion pose
The character gradually comes closer to the lens and fills the center of the frame.
He hangs the large dice at one side of his body, while his other hand goes into a pocket or lightly touches the coat.
The camera shoots slightly from a low angle upward, making the white long coat and yellow decorations stand out more.
The background remains black-and-white. The character adjusts his step slightly and stops for half a second, looking straight into the lens or tilting his head a little.
The red title keeps its place at the bottom.

5–7 seconds | Black-background film contact sheet
The close-up of the character quickly shrinks into a vertical film photo, and the frame switches to a pure black background.
Two to three small vertical frames appear one after another in the center of the black background:
First: the lead standing in a colored street;
Second: the lead lifting a leg to kick the dice;
Third: a passerby walking past in front of the lens.
The small frames look like photographic contact prints or magazine layout, with white edges and slight film flicker.
The red "color of summer" stays steady at the bottom center.

7–9.5 seconds | Full-color street and the dice kick
The frame returns to full color.
The lead stands in front of a coral-red wall and a cobalt-blue wooden door. The large black dice sits by his feet.
He first holds still upright, then slowly lifts one leg and gently kicks the dice with the tip of his shoe:
the dice tumbles forward one to two times;
the white dots are clearly visible;
his trouser leg wrinkles from the lifted leg;
the hem of his coat swings slightly.
The camera is fixed frontally or pushes in slightly, and the composition feels like a fashion-magazine photo coming to life.

9.5–12.5 seconds | Fisheye street group dance
Cut to a circular fisheye lens.
A black circular vignette forms around the frame, with a central view of highly saturated orange-red and blue-green streets.
The lead and four to six young people dance around the large dice:
someone rushes past the lens, their legs exaggeratedly enlarged by the fisheye;
the lead crouches slightly;
a character in blue trousers strides across the foreground;
a person in orange clothing lifts a leg;
a person in green shorts claps in the background;
the dice rolls around at everyone's feet.
The camera sits very low and sways slightly left and right, without violent shaking.
The red title at the bottom is partly cropped by the edge of the circular fisheye, but still legible.

12.5–14.5 seconds | Walking alone down the street
The fisheye black edges exit the frame through a quick expansion, returning to a normal vertical street shot.
The lead walks alone along a narrow alley from left to right, the large dice dragged, rolling, or connected by a thin cord behind him.
The background buildings are pink, off-white, and brick red. The camera tracks from the side with a lateral pan, the lead's steps relaxed, and the hem of his coat swinging with the motion.
This segment forms a brief breath after the group-dance climax.

14.5–17 seconds | Walking toward the camera beside a vintage car
The lead walks frontally toward the camera from far down the street.
Behind him a vintage yellow car appears, slowly driving in or parking at the street corner. Red and green walls frame both sides.
The large dice rolls on the ground to the right of the character, each roll roughly synchronized with his steps.
The camera steadily dollies back, with the character always centered and the red title at the bottom.

17–19 seconds | Pool-party insert
A quick hard cut to a summer pool scene.
In the teal-blue pool, a group of young men and women are playing in the water:
someone raises their arms;
someone lifts a friend;
water splashes up;
along the poolside stand people in pink, green, and orange swimwear;
the background is orange-red old buildings and blue sky.
The camera shoots from a slightly high angle, with a short hold, like a summer life photo inserted into the fashion film.
Do not show the lead changing clothes. The pool is only an atmosphere insert.

19–21.5 seconds | Close-up of the lead adjusting the yellow decorations
Cut back to a shallow-depth-of-field close-up of the lead on the old-town street.
The lead stands at the center of the frame, while the colors of the street and pool are softened into highly saturated bokeh.
He looks down at his chest and slowly adjusts or lightly touches the yellow arc decorations with one hand:
his fingers pinch one of the yellow cord straps;
the cord shifts slightly;
the fabric texture of the white coat is clearly visible;
the lead gradually breaks into a faint smile.
The camera slowly pushes from a medium shot to close-ups of the chest and face.

21.5–23 seconds | The yellow decorations start to extend
The yellow cord straps on the lead's chest seem to come alive, stretching out of the frame as hand-drawn lines.
Motion:
the first yellow arc grows from the chest up and to the left;
the second rotates toward the right;
more yellow rings and short lines are generated around the character;
the character stays largely still;
the background remains a colorful street alley.
As the lines appear, they carry a slight frame-by-frame jitter and a crayon texture.

23–25 seconds | Fisheye doodle climax and freeze
The frame cuts back to a circular fisheye view.
The lead stands frontally in the center of the old-town street. There is no dense crowd around, so the subject is clearer.
A large number of yellow hand-drawn graphics appear rapidly:
a yellow halo above the head;
radial lines on both sides of the body;
the chest cords extending into spirals;
arc trails on the ground;
short arrows and wavy lines at the frame edges;
the large dice at the character's feet.
The doodle lines are first drawn quickly, then undergo one slight rotation and spread, and finally settle.
The lead keeps a frontal standing pose with a slight tilt of the head, forming a fashion-hero image.
The red title at the bottom:
color of summer
appears clearly.
In the last 0.3 seconds, all doodles stop moving, and the character, the dice, and the street freeze, with no fade to black.

8. Transition design
Black-and-white to color
The opening is completed by gradually spreading local coloring:
the character keeps color first;
then the red walls and blue doors regain color outward from around the character;
no white flash is used.
Street to film contact sheet
After the character walks toward the lens, the current frame quickly shrinks into one vertical photo on a black background.
Normal shot to fisheye
A black circle contracts from the center or edge of the frame, forming a circular fisheye frame; on exit, the circular edge expands outward.
Street to pool
Blue trouser legs, blue doors, or sky color blocks fill the frame, matching the switch to the pool's blue water.
Chest cord to doodle
The yellow costume decorations extend directly into two-dimensional hand-drawn lines, keeping color, thickness, and direction of motion continuous.

9. Motion detail requirements
Lead consistency
the same character throughout;
hairstyle and face do not change;
the white coat length stays fixed;
four to five groups of yellow arc decorations are maintained;
the blue trousers do not change color;
the white shoes do not change;
no second identical lead is generated.
Dice
always the same large black soft dice;
clear six-face structure;
the white dot arrangement follows realistic dice logic;
it never becomes a sphere when rolling;
its size never changes suddenly;
it does not float like a magic prop;
it makes realistic contact with the ground.
Fisheye lens
used only during the designated group-dance and ending phases;
the black circular vignette is clear;
the center is sharp;
the edge stretching is pronounced;
the character's body does not break apart;
not used continuously throughout the film.
Hand-drawn doodles
color unified as bright yellow;
hand-made brushstrokes with slight wobble;
not turned into a 3D glowing tube;
no readable text generated;
never covers the face for more than a brief moment;
the final composition stays orderly.

10. Sound design
Use light, lively, Latin street-flavored rhythm music. The overall sound should sync with the steps in the frame, the dice tumbling, and the hand-drawn lines.
Music character:
a summery feel;
light percussion;
hand drums, shakers, and wood-block knocks;
vintage bass;
a few brass or bright guitar syncopations;
light street ambience;
lively rhythm, not overly electronic.
Sound cues:
black-and-white opening: keep street ambience and a simple beat;
film frame appears: sync with shutter and film-advance sounds;
dice tumbling: add soft low-frequency impacts and continuous flipping sounds;
fisheye group dance: the music enters its densest percussion section;
pool: add short splash sounds;
chest decoration extending: sync with crayon-drawing sounds;
final doodles: each line appearing matches a short high-frequency scratching sound or a whistle;
the last frame ends on a clean drum hit.
No grand cinematic score, no dark low frequencies, no spoken narration, no intense EDM.

11. Style keywords
summer fashion film in colorful Havana streets, Caribbean old town editorial, young Black male fashion model, white long coat with yellow loop details, cobalt blue trousers, oversized black dice, selective color black and white opening, vintage 35mm film grain, contact sheet layout, saturated colonial architecture, fisheye street dance, Latin summer energy, pool party insert, handwritten yellow doodle animation, red serif title, playful fashion campaign, low-angle wide lens, retro magazine photography, vibrant street culture, color of summer

12. Negative prompts
No modern glass business district, no cold grey city, no night scenes, no neon cyberpunk, no face swapping of the character, no costume changes, no change in the number of yellow decorations, no ordinary suit or short jacket, no black dice turning into a small dice, no chaotic dice pips, no melting dice, no distorted character limbs, no excessive number of group dancers, no fisheye throughout the entire film, no cartoon 3D characters, no yellow doodles turning into neon lights, no complex text, no extra brand names, no garbled red title, no excessive skin smoothing, no modern high-definition digital feel, no continuous camera shake, no strong motion blur, no low resolution, no watermark.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
生成一支 25 秒、9:16 竖版的高饱和夏日街头时装短片。
整支视频发生在一座具有加勒比海、古巴哈瓦那或拉丁美洲老城区气质的城市街区。街道狭窄，地面铺设旧石板，两侧排列色彩鲜艳、表面略有斑驳的历史建筑：
珊瑚红墙面；
橙黄色立面；
青绿色门窗；
钴蓝色木门；
粉色与紫红色外墙；
老式阳台、铁艺栏杆和脱落的墙皮；
远处偶尔停放一辆复古黄色汽车；
夏日阳光明亮强烈；
空气中带轻微湿热感与胶片颗粒。
主角是一名年轻成年男性，身材修长，短黑发，气质冷静、自信、略带时尚模特式疏离感。
人物造型在全片保持一致：
白色或奶油白色长款修身外套；
外套长度到膝盖附近；
正面从胸口到腹部纵向排列四到五组黄色弧形、环形或带状装饰；
黄色装饰像缝制在衣服上的软质绳带；
外套内搭保持简洁；
高饱和钴蓝色或宝蓝色长裤；
白色鞋；
不佩戴帽子；
不改变发型、服装颜色和黄色装饰数量。
全片的重要道具是一枚 大型黑色软骰子：
近似立方体；
表面为黑色软胶、织物或哑光塑料；
六个面带大型白色圆点；
尺寸接近人物小腿高度；
可以被人物手持、踢动、抛起、拖动或放在地面；
所有镜头中保持相同比例与外形；
不变成普通小骰子。
画面底部持续或间歇出现红色小标题：
color of summer
标题使用复古粗体衬线或打字机式字体，字距略宽，颜色为暗红或鲜红。文字位于底部中央，尺寸小而醒目。除这句标题外，不出现其他大段文案。
一、整体画面风格
色彩系统
画面前半段使用 黑白背景与彩色人物的局部上色效果：
建筑、街道和路人是高对比黑白；
主角白色外套、黄色胸前装饰、蓝色裤子和黑色骰子保留彩色；
红色标题保持彩色；
黑白部分带银盐胶片颗粒和略微过曝的白色天空。
进入中段后，场景逐渐恢复全彩：
红、橙、黄、蓝、青绿、粉色形成强烈撞色；
人物白色服装保持亮度中心；
黄色装饰与城市暖色建筑形成呼应；
蓝色裤子与青蓝门窗形成冷暖对比。
后段泳池场景使用：
青蓝池水；
珊瑚红建筑；
粉色、绿色、橙色泳装；
亮白阳光；
高饱和热带夏日色彩。
2. 胶片与画面材质
整体模拟 1990 年代时尚摄影、老胶片杂志与夏日旅行录像：
明显但细腻的胶片颗粒；
轻微褪色；
高光略微泛白；
阴影带少量青灰或暖红偏色；
局部漏光；
轻微画面抖动；
少量灰尘、划痕与帧间跳动；
快动作中出现胶片式方向拖影；
不要现代超锐利数码感。
部分画面可以使用：
黑色胶片边框；
圆角画幅；
接触印样式小照片；
轻微错位套色；
多重曝光；
一帧短促过曝。
二、人物表演与动态气质
主角的动作不是专业舞蹈编排，而是介于时装摆拍、街头即兴舞蹈和夏日游戏之间。
动作特点：
步伐松弛；
肩膀自然摆动；
偶尔踢动骰子；
轻微下蹲；
一只脚踩在骰子附近；
双手调整黄色胸前绳带；
面对镜头短暂停留；
与周围人群形成简单节奏互动；
表情克制，但偶尔露出轻微笑容。
人物始终是视觉中心。背景群众动作更热闹、更自由，但不能遮挡主角。
三、群体角色与服装
中段出现四至六名年轻男女，与主角一起在街道上跳舞或围绕骰子互动。
群体服装使用高饱和夏日色彩：
橙色背心或宽松上衣；
绿色短裤；
粉色花纹短裤；
青蓝色无袖上衣；
宝蓝长裤；
黄色或红色配件；
轻便夏装；
复古运动风和街头风混合。
人物肤色、发型和体型可多样化，但所有人保持真实自然，不使用统一模特脸。
群体动作：
侧步；
抬腿；
轻微旋转；
围绕骰子下蹲；
拍手；
彼此看向对方；
从镜头近处快速经过；
形成街头庆典与即兴游戏感。
四、手绘黄色动态图形
视频后段与结尾叠加大量鲜黄色手绘图形。
图形语言包括：
粗细不均的黄色蜡笔线；
手绘圆环；
连续螺旋；
箭头；
波浪线；
速度线；
半圆；
断续短线；
像胸前黄色绳带被放大、复制和延伸到空间中。
动态方式：
黄色线条沿人物轮廓快速绘制；
从胸前黄色装饰向四周生长；
圆环围绕头部、手臂和腿部旋转；
地面出现黄色弧形轨迹；
画面边缘出现放射线；
线条可以短暂遮挡人物，但不能覆盖面部太久；
所有涂鸦有真实手绘抖动，不是精准矢量 UI。
五、镜头语言
全片混合四种主要镜头风格。
低机位街头跟拍
镜头位于腰部或膝盖高度；
人物从街道远处向镜头走来；
地面石板形成强烈纵深；
建筑向上汇聚；
轻微手持或稳定器跟拍；
带时尚纪录片气质。
正面长焦肖像
人物居中走向镜头；
背景轻微压缩；
主角面部和黄色装饰清晰；
周围街景柔和虚化；
镜头缓慢后退。
圆形鱼眼镜头
强烈超广角；
画面四周形成黑色圆形暗角；
中央街道被夸张拉伸；
靠近镜头的人腿、手臂和骰子被放大；
建筑向画面边缘弯曲；
用于群舞和最终涂鸦高潮。
胶片接触印排版
黑色全屏背景；
中央排列两至三张竖向小照片或活动画面；
每张画面带白边或胶片边缘；
小画面依次出现人物走路、踢骰子和街头群众；
下方保留红色标题。
六、25 秒详细时间轴
0—3 秒｜黑白街道中的彩色主角
画面从狭窄老城街道的黑白长镜头开始。
两侧建筑、石板地面和背景路人全部为高对比黑白。主角从画面左侧或街道深处走入，只有以下元素保留彩色：
白色长外套；
黄色胸前弧形装饰；
蓝色长裤；
黑色骰子与白色圆点；
底部红色标题“color of summer”。
镜头在人物正前方缓慢后退。主角手持大型黑色骰子，平静地走向镜头，偶尔看向一侧。
画面带明显胶片颗粒、轻微过曝和细小抖动。
3—5 秒｜主角正面靠近与时装姿态
人物逐渐靠近镜头，占据画面中央。
他把大型骰子垂在身体一侧，另一只手放入口袋或轻触外套。
镜头略微从低角度向上拍摄，使白色长外套与黄色装饰更加突出。
背景仍为黑白。人物轻微调整步伐并停住半秒，直视镜头或略微偏头。
红色标题继续位于底部。
5—7 秒｜黑底胶片接触印
人物近景快速缩小成一张竖向胶片照片，画面切换为纯黑背景。
黑色背景中央依次出现两至三张小型竖画幅：
第一张：主角站在彩色街道中；
第二张：主角抬腿踢骰子；
第三张：一位路人从镜头前经过。
小画面像摄影接触印或杂志版式，带白色边缘、轻微胶片抖动。
红色“color of summer”在底部中央保持稳定。
7—9.5 秒｜全彩街道与踢骰子
画面恢复全彩。
主角站在一面珊瑚红墙与钴蓝色木门前。大型黑色骰子位于他脚边。
他先保持直立，然后缓慢抬起一条腿，用鞋尖轻轻踢动骰子：
骰子向前翻滚一至两次；
白色圆点清晰可见；
主角裤腿因抬腿动作产生褶皱；
外套下摆轻微摆动。
镜头正面固定或轻微推近，构图像时装杂志照片被激活。
9.5—12.5 秒｜鱼眼街头群舞
切换到圆形鱼眼镜头。
画面四周形成黑色圆形暗角，中央是高饱和橙红、蓝绿街道。
主角和四至六名年轻人围绕大型骰子跳舞：
有人从镜头前快速经过，腿部因鱼眼被夸张放大；
主角轻微下蹲；
一名蓝裤人物从前景跨过；
橙色衣服的人抬腿；
绿色短裤的人在背景拍手；
骰子在众人脚边滚动。
镜头位于很低的位置，轻微左右摆动，但不剧烈抖动。
底部红色标题部分被圆形鱼眼边缘裁切，仍可识别。
12.5—14.5 秒｜街道独自行走
鱼眼黑边通过快速扩张退出画面，恢复普通竖版街道镜头。
主角独自沿狭窄巷道从左向右行走，大型骰子在他身后拖行、滚动或以细绳连接。
背景建筑为粉红、米白与砖红色。镜头侧面平移跟随，人物步伐松弛，外套下摆随动作摆动。
这一段形成群舞高潮后的短暂呼吸。
14.5—17 秒｜正面走来与复古汽车
主角从街道远处正面走向镜头。
身后出现一辆复古黄色汽车，缓慢驶入或停在街角。两侧为红色和绿色墙面。
大型骰子在人物右侧地面滚动，每次翻转的速度与人物步伐大致同步。
镜头稳定后退，人物始终居中，红色标题位于底部。
17—19 秒｜泳池派对插入镜头
快速硬切到夏日泳池场景。
青蓝色泳池中，一群年轻男女正在玩水：
有人抬起手臂；
有人把朋友托起；
水面产生飞溅；
岸边站着穿粉色、绿色、橙色泳装的人；
背景是橙红色老建筑与蓝天。
镜头略高角度俯拍，停留时间短，像一张夏日生活照片插入时装片中。
不要出现主角换装，泳池只是氛围补充镜头。
19—21.5 秒｜主角近景调整黄色装饰
切回老城街道的浅景深人物近景。
主角站在画面中央，背景街道与泳池色彩被柔化成高饱和散景。
他低头看向胸前，用一只手缓慢调整或轻触黄色弧形装饰：
手指夹住其中一条黄色绳带；
绳带轻微移动；
白色外套的面料纹理清晰；
人物逐渐露出轻微笑容。
镜头从中景缓慢推到胸口和面部近景。
21.5—23 秒｜黄色装饰开始延展
人物胸前的黄色绳带像获得生命一样，向画面外部延伸成手绘线条。
动态：
第一条黄色弧线从胸口向左上生长；
第二条向右侧旋转；
更多黄色圆环和短线围绕人物生成；
人物保持基本静止；
背景仍是彩色街巷。
线条出现时伴随轻微逐帧抖动和蜡笔质感。
23—25 秒｜鱼眼涂鸦高潮与定格
画面重新切入圆形鱼眼视角。
主角正面站在老城街道中央，周围没有密集人群，主体更加清晰。
大量黄色手绘图形快速出现：
头部上方的黄色光环；
身体两侧的放射线；
胸前绳带延伸形成螺旋；
地面出现弧形轨迹；
画面边缘出现短箭头与波浪线；
大型骰子位于人物脚边。
涂鸦线条先快速绘制，再进行一次轻微旋转和扩散，最后稳定。
主角保持正面站姿，轻微抬头，形成时装英雄画面。
底部红色标题：
color of summer
清晰出现。
最后 0.3 秒所有涂鸦停止运动，人物、骰子和街道定格，不淡出黑场。
七、转场设计
黑白到彩色
开场通过局部上色逐渐扩散完成：
人物先保留彩色；
随后红墙与蓝门从人物周围向外恢复色彩；
不使用闪白。
街道到胶片接触印
人物走近镜头后，当前画面快速缩小成黑色背景中的一张竖向照片。
普通镜头到鱼眼
黑色圆形从画面中心或边缘收缩，形成圆形鱼眼画幅；退出时圆形边缘向外扩张。
街道到泳池
使用蓝色裤腿、蓝门或天空色块填满画面，匹配切换至泳池蓝色水面。
胸前绳带到涂鸦
黄色服装装饰直接延长为二维手绘线条，保证颜色、粗细与运动方向连续。
八、动效精细度要求
主角一致性
始终是同一人物；
发型与面部不改变；
白色外套长度稳定；
黄色弧形装饰保持四至五组；
蓝裤不变色；
白鞋不改变；
不生成第二个相同主角。
骰子
始终是同一个大型黑色软骰子；
六面结构清晰；
白点排列符合真实骰子逻辑；
滚动时不变成球体；
不突然改变尺寸；
不漂浮成魔法道具；
与地面保持真实碰撞。
鱼眼镜头
只在指定群舞与结尾阶段使用；
黑色圆形暗角清楚；
中心清晰；
边缘拉伸明显；
不让人物身体断裂；
不持续全片使用。
手绘涂鸦
颜色统一为鲜黄色；
有手工笔触与轻微抖动；
不变成 3D 发光管；
不生成可读文字；
不遮挡面部超过短暂瞬间；
最终构图保持有秩序。
九、声音设计
使用轻快、热烈、带拉丁街头气息的节奏音乐。整体声音应与画面中的步伐、骰子翻滚和手绘线条同步。
音乐气质：
夏日感；
轻快打击乐；
手鼓、沙锤、木质敲击；
复古贝斯；
少量铜管或明亮吉他切分；
轻微街头环境声；
节奏活泼但不过度电子化。
声音节点：
开场黑白画面：保留街道环境声和简洁节拍；
胶片画框出现：配合快门与胶片推进声；
骰子翻滚：加入柔软低频撞击和连续翻面声；
鱼眼群舞：音乐进入最密集的打击乐段；
泳池：加入短促水花声；
胸前装饰延展：配合蜡笔划线声；
最终涂鸦：每条线出现时对应短促高频划线或口哨音；
最后一帧以干净鼓点结束。
不要宏大电影配乐，不要阴暗低频，不要人声旁白，不要强烈 EDM。
十、风格关键词
summer fashion film in colorful Havana streets, Caribbean old town editorial, young Black male fashion model, white long coat with yellow loop details, cobalt blue trousers, oversized black dice, selective color black and white opening, vintage 35mm film grain, contact sheet layout, saturated colonial architecture, fisheye street dance, Latin summer energy, pool party insert, handwritten yellow doodle animation, red serif title, playful fashion campaign, low-angle wide lens, retro magazine photography, vibrant street culture, color of summer
十一、负面提示词
不要现代玻璃商务区，不要冷灰城市，不要夜景，不要霓虹赛博朋克，不要人物换脸，不要服装变化，不要黄色装饰数量变化，不要普通西装短外套，不要黑色骰子变成小型骰子，不要骰子点数混乱，不要骰子融化，不要人物肢体扭曲，不要群舞人物数量过多，不要鱼眼持续全片，不要卡通 3D 人物，不要黄色涂鸦变成霓虹灯，不要复杂文字，不要额外品牌名称，不要红色标题乱码，不要过度磨皮，不要现代高清数码感，不要持续镜头抖动，不要强烈运动模糊，不要低清晰度，不要水印。
```

</details>

<a id="text-to-video-17"></a>
### 17. Doodle Monsters Invade a Night Kitchen

`wan3.0-text-to-video` · 15s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=text-to-video-17#text-to-video-17)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

First-person night-home footage where crude crayon doodles appear: a star, butterflies, a squid, and a burger monster.

<table>
<tr><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/83585424-cb8a-45b9-a429-f824cf4fc3e8" width="640" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Generate a 15-second, 16:9 landscape short that combines “low-light realistic indoor photography × rough hand-drawn MG animation × first-person interactive VFX.” The whole piece is shot from a first-person POV, simulating continuous shooting in a night home with a small action camera or a handheld ultra-wide camera. Overall it is not a polished commercial, but a personal creative piece with a sense of chance, immediacy, and slight loss of control.

Live-action space and color

The setting is a small home at night, with a living room, dining table, computer work area, narrow hallway, and kitchen connected to one another. The space feels a little crowded, the furniture is not perfectly symmetrical, and real traces of daily life are kept.

The walls are matte light brown and pale coffee-colored, with fine wall-paint grain, uneven shadows, and slight signs of use. The furniture is mainly dark old wood, black leather, and dark fabric, and the wooden tabletop keeps small scratches, uneven reflections, and everyday objects. Do not make it too tidy, do not make it a showroom or a premium guesthouse.

The room has no bright ceiling light. The main light sources are warm yellow wall lamps, small table lamps, the laptop screen, and a string of red, yellow, green, and blue small bulbs hung irregularly along the ceiling. The windows are completely dark. Most of the room sits in low-light shadow, lit only in patches by the wall lamps.

The overall palette is dominated by dark brown, caramel, amber orange, and deep black. The shadows must not all be lifted; the corners, the bottoms of furniture, and the hallway must keep large areas of deep shadow. The computer screen provides a small amount of cold blue light, and when the refrigerator opens a sudden, stronger cold-white light appears, with auto-exposure needing a brief adjustment.

The image keeps the low-light traits of a consumer camera: slight high-ISO noise, colored grain in the dark areas, limited dynamic range, slight color shift, lens vignetting, compression texture, and imperfect motion blur. No cinematic noise-free image quality, no crisp and transparent commercial photography, no 3D-rendered feel or plastic materials.

POV lens and real handheld shake

Use an approximately 14–16mm ultra-wide lens with slight fisheye distortion and barrel distortion, so the furniture and door frames at the edges of the frame bend slightly. The camera sits at an adult's eye or chest height, so the viewer is the person in action.

The lens must not be as smooth as a stabilizer. Irregular, real handheld movement is kept throughout:

while observing still, there are small breathing rises and falls and left-right shifts in center of gravity;
when the arm is raised, the camera drifts slightly in the opposite direction;
when the person walks, each step brings a small up-and-down bounce and a slight left-right roll;
when the lens turns, it accelerates first and then decelerates, with a very small overshoot and rebound at the stopping point;
the hand moves first, and the camera follows about 0.1 seconds later, creating a real reaction time;
quick head-down, head-up, and turning movements show clear directional motion blur and slight rolling-shutter distortion;
when the lens gets too close to the computer, the wall, or the refrigerator, the composition allows tilt, cropping, and brief defocus;
after movement stops, autofocus needs about 0.2 seconds to lock again.

The shake must come from breathing, footsteps, turning inertia, and startled reactions; it must not be regular vibration, nor continuous high-frequency wobble throughout. The lens should feel genuinely unstable, but the viewer must still be able to see the core action.

Only the real right hand or both forearms of the same person appear in the frame. The arms keep an unretouched live-action skin texture, including pores, fine body hair, joint texture, and warm-light shadows. The arms must not show a white outline, cartoon outline, or cut-out edges. The MG lines may move only around the arms; they must not outline the entire hand like a sticker.

Hand-drawn MG texture

All animation is rough, two-dimensional, frame-by-frame hand-drawn, not smooth vector animation, not 3D cartoon, not plastic stickers.

The strokes are a mix of wax crayon, oil pastel, chalk, and dry brush. Line widths are uneven, with bristle splits, grainy gaps, broken strokes, repeated drawing, and local semi-transparent traces at the edges. The outline of every frame changes slightly, forming a clear but restrained “line boil.”

The animation pulses at roughly 10–12 hand-drawn frames per second, while the live-action background keeps moving continuously. Strokes must not use perfect curve interpolation; they must carry the slight stutter, stretch, and position drift of frame-by-frame hand drawing.

The colors are mainly chalk white, bright yellow, cyan-blue, vivid red, and fluorescent pink. The colors are rough matte pigment, without mirror highlights, plastic reflections, solid thickness, soft shadows, or strong neon glow.

Simple creatures may use black outlines, but the outlines must be uneven in thickness, broken, and wobbly, not forming smooth, uniform cartoon edges. Butterflies, octopuses, burgers, and giant mouths should look like improvised children's doodles or independent-animation key drawings, not commercial sticker art.

The animation must follow the real camera perspective:

it grows quickly as it nears the lens and shrinks clearly as it moves away;
it correctly occludes when passing door frames, arms, tabletops, and the refrigerator door;
when the camera whips, the animation also shows motion blur and brief trails;
the animation must not always stay centered; it may enter from the frame edge, partly leave the frame, or be cropped by the lens;
graphics attached to walls and computers must follow the surface perspective and must not float parallel above the screen.

0–2 seconds | White strokes wrap the arm

The shot opens in a dim living room, with the composition tilted slightly to the left. In the lower right corner only part of the computer screen is visible; deep in the room are the dark window, the dining table, and a warm yellow wall lamp.

The person raises the right arm, and the camera sinks slightly and shifts sideways due to the change in body weight. The index finger draws an arc in the air, and a rough white dry-brush stroke grows from the fingertip in real time.

The white line does not trace the outer contour of the arm. Instead, like a loose rope, it passes between the fingers, wraps behind the palm, and then continuously winds around the wrist and forearm. The part that wraps to the back of the arm is naturally hidden by the skin. Every frame of the white line wobbles slightly, with bristle texture and paint gaps showing locally.

The person opens the palm, and an irregular yellow hand-drawn five-pointed star pops out of the center of the palm. The star's edges are rough, with multiple crayon textures visible inside. It must not be a smooth, solid-color icon.

2–4.3 seconds | The star enters the computer and bursts out cyan strokes

The person makes a pinching gesture as if holding the star, then quickly flicks the hand down and to the right. The camera follows with a slight delay, bowing its head, producing a clear downward whip, edge stretching, and brief motion blur.

The yellow star drags two hand-drawn trails as it flies toward the computer. The computer does not appear centered in the frame; it appears in the lower part of the frame in a tilted perspective. After the star falls into the screen, it drags a rough red line across the screen surface and quickly draws an asymmetrical red heart.

The inside of the red heart is filled with several layers of messy strokes. Cyan-blue dry-brush strokes spin rapidly around the heart, with some strokes extending beyond the screen edges. The camera moves even closer to the screen, and the frame may crop part of the keyboard and screen bezel.

Blue and yellow strokes suddenly burst upward from the edge of the computer screen, and the camera immediately tilts up quickly to follow. Thick strokes pass close to the lens, briefly occupying most of the frame, with rough bristles and uneven pigment visible. Do not make them into soft plastic ribbons.

4.3–6.3 seconds | The strokes turn into butterflies and guide a turn

The blue and yellow strokes contract near the beige-brown wall into two loose white-and-blue hand-drawn butterflies. The butterflies are formed only by a few quickly painted wing outlines, with no fine veins and no uniform black edges.

The butterflies fly toward the hallway, one near and one far, flapping rapidly. The near butterfly briefly brushes past the left side of the lens and is cropped, and the camera immediately turns to chase. The turn includes a fast whip of about 90 degrees, strong directional blur, and a small overshoot; it must not be a smooth rotation.

The camera walks toward the hallway with two or three consecutive step bounces. A butterfly passing a door frame is partly hidden by it and then reappears on the other side. The room brightness naturally drops as it enters the hallway.

6.3–9.5 seconds | A pink line and a small octopus

One of the butterflies turns, near a wall lamp, into a short pink crayon line. The pink line grows quickly along the wall, around the corner and door frame, forming a few loose large arcs and spirals in real space.

The camera follows the pink line as it walks, the frame tilts slightly, and the foreground door frame quickly sweeps past the side of the lens. When the pink line is very close to the lens, only partial thick strokes are shown; it must not always appear complete and centered.

At the end of the line, two simple white eyes and several short tentacles grow out, turning it into a very small pink octopus. The octopus takes up only about 5%–8% of the frame width, bouncing up and down in the distance of the hallway. Do not generate a large, refined cartoon character.

The octopus moves toward the refrigerator, while several hand-drawn yellow arrows flash beside it in succession. The arrows are crooked in shape and rough in stroke, and are erased quickly after appearing. The camera follows the octopus quickly toward the refrigerator, the step rate increases, and the camera shake increases slightly.

9.5–12.3 seconds | The burger monster in the refrigerator

The person's right hand reaches for the refrigerator handle, and the camera gives a slight collision-like jolt from the body moving closer. When the refrigerator door is opened, cold-white light suddenly appears; the frame briefly overexposes, then auto-exposure quickly pulls it down.

The inside of the refrigerator must not be brand-new and empty; it should hold drink cans, plastic containers, bottles, and leftover food. On a shelf slightly toward the back, a smaller hand-drawn burger stands, taking up only about 15% of the refrigerator's interior area, and must not appear large and centered in close-up.

The burger has an orange-yellow bun, red tomato, green lettuce, two asymmetrical round eyes, and tiny arms and legs. The colors keep the crayon-smudge texture, and the black outlines keep jumping slightly.

The burger first sways innocently, then the top and bottom buns suddenly split open, revealing a dark mouth and two rows of rough white triangular teeth of uneven size. The monster jumps forward once, and the startled camera quickly retreats and tilts to one side.

The person immediately pushes the refrigerator door shut. The door panel sweeps across the right side of the frame quickly, producing real occlusion, impact vibration, and brief blur. Do not keep the monster in a long, frontal, centered view.

12.3–15 seconds | Hand-drawn eyes and a giant mouth attack

After the refrigerator door closes, the camera turns quickly. The turn is about 120 degrees, with obvious handheld whip, rolling-shutter tilt, and shadow-area trails. When the lens stops, it slightly overshoots the target, then swings back a little.

A rough white hand-drawn eye appears on the living-room wall. The eye is formed by several unclosed white dry-brush outlines, with a simple cyan iris and a black pupil inside. Do not draw a realistic eye, and do not add eyelashes, eyeball highlights, or refined gradients.

The pupil searches quickly left and right, then suddenly looks toward the lens. The camera gives a tense slight backward step and unstable breathing.

Below the eye, a thick fluorescent-pink line extends quickly to both sides, forming a huge curved mouth. The inside of the mouth is rough dark smudging, with two rows of white triangular teeth of different sizes and crooked arrangement, the edges retaining clear chalk grain.

The giant mouth pauses for about 0.2 seconds, then suddenly leaves the wall and lunges toward the lens. The camera is startled and violently leans back, with the frame shaking quickly. In the final 0.6 seconds the giant mouth undergoes an extreme perspective magnification; only part of the pink mouth corner and white teeth enter the frame, with the rest cropped by the frame edge.

The frame ends the instant the teeth are about to bite the lens; it does not fade out, does not cut to black, and no text appears.

Sound

No dialogue is generated, and no music with a clear melody is used. Keep the night indoor room tone, footsteps, breathing, clothing friction, the refrigerator door, and hand-swing sounds. The MG animation is accompanied by crayon friction, dry-brush sweeps, elastic stretching, paper flapping, and short cartoon impact sounds. When the giant mouth lunges, add a rapidly rising low-frequency impact and the sound of air being cut.

Mandatory restrictions

The live-action background must not have 3D-rendered, game-scene, plastic-model, or AI-showroom texture; walls, wood, leather, skin, and the refrigerator must be matte, natural, and imperfect live-action materials. The camera must not be as stable as a gimbal head, must not stay level throughout, and must not automatically center every subject.

The arms must not show cartoon white borders, outlines, or cut-out contours; the white animation may only wrap around the arm and must not trace lines along the skin edge.

The MG animation must not use smooth Bezier curves, uniform outlines, pure vector fills, gradient plastic, 3D thickness, mirror highlights, soft drop shadows, high-definition commercial cartoon, or sticker-style looks. Do not let butterflies and octopuses become too large, overly refined, or always facing the camera. Do not include a human face, subtitles, logos, watermarks, white-flash transitions, or ordinary hard cuts.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
生成一支15秒、16:9横版的“低照度真实室内摄影 × 粗糙手绘MG动画 × 第一人称互动VFX”短片。全片为第一人称POV视角，模拟使用小型运动相机或手持超广角相机，在夜晚住宅中连续拍摄。整体不是精致广告片，而是一段带有偶然性、即时感和轻微失控感的个人创意影像。

实拍空间与色调

场景是一间面积不大的夜晚住宅，客厅、餐桌、电脑工作区、狭窄过道和厨房彼此连接。空间略显拥挤，家具并不完全对称，保留真实生活痕迹。

墙面为哑光米棕色和浅咖啡色，带有细微墙漆颗粒、阴影不均和轻微使用痕迹。家具以深色旧木材、黑色皮革和暗色织物为主，木质桌面保留细小划痕、反光不均和日常物品。不要过度整洁，不要样板间，不要高级民宿。

室内不开明亮顶灯。主要光源来自暖黄色壁灯、桌边小灯、笔记本电脑屏幕，以及沿天花板不规则悬挂的一串红、黄、绿、蓝色小灯泡。窗外完全黑暗。房间大部分区域处于低照度阴影中，只有局部被壁灯照亮。

整体色调以暗棕色、焦糖色、琥珀橙和深黑色为主。暗部不能全部提亮，墙角、家具底部和过道必须保留大片深色阴影。电脑屏幕提供少量冷蓝光，冰箱打开时出现突然增强的冷白光，自动曝光需要短暂调整。

画面保留消费级相机的低照度特征：轻微高感噪点、暗部彩色颗粒、有限动态范围、轻微色彩偏移、镜头暗角、压缩纹理和不完全干净的运动模糊。禁止电影级无噪点画质，禁止通透锐利的商业摄影，禁止三维渲染感和塑料材质。

POV镜头与真实手持抖动

使用约14—16mm超广角镜头，存在轻微鱼眼畸变和桶形变形，画面边缘的家具与门框略微弯曲。摄影机位于成年人眼睛或胸口高度，观众就是正在行动的人物。

镜头不能像稳定器一样平滑。全程保留不规则的真实手持运动：

静止观察时也有细小呼吸起伏和左右重心变化；
手臂抬起时，摄影机轻微向反方向偏移；
人物行走时，每一步带来小幅上下起伏和轻微左右滚转；
镜头转向时先加速、后减速，停止位置有一次很小的过冲与回弹；
手部动作先发生，摄影机延迟约0.1秒跟随，形成真实反应时间；
快速低头、抬头和转身时出现明显方向性运动模糊与轻微滚动快门变形；
镜头接近电脑、墙壁和冰箱时距离过近，构图允许偏斜、裁切和短暂失焦；
运动结束后自动对焦需要约0.2秒重新锁定。

抖动必须来自呼吸、脚步、转身惯性和受惊反应，不能是规律振动，也不能全程高频乱晃。镜头既要有真实不稳定感，也要让观众看清核心动作。

画面中只出现同一人物的真实右手或双手前臂。手臂保持未经美化的实拍皮肤质感，包括毛孔、细小汗毛、关节纹理和暖光阴影。手臂不能出现白色描边、卡通描边或抠图边缘。MG线条只能围绕手臂运动，不能把整只手勾勒成贴纸。

手绘MG质感

所有动画均为粗糙的二维逐帧手绘，不是光滑矢量动画，不是3D卡通，不是塑料贴纸。

笔触由蜡笔、油画棒、粉笔和干燥排刷混合形成。线条宽度不均匀，边缘有刷毛分叉、颗粒缺口、断笔、重复描画和局部半透明痕迹。每一帧的轮廓都会产生轻微变化，形成明显但克制的“线条沸腾”。

动画以接近每秒10—12张手绘帧的节奏跳动，而实拍背景保持连续运动。笔触移动时不能做完美曲线插值，必须带有逐帧手绘产生的轻微顿挫、伸缩和位置漂移。

颜色以粉笔白、明黄色、青蓝色、鲜红色和荧光粉色为主。颜色为粗糙哑光颜料，没有镜面高光、塑料反射、立体厚度、柔软阴影或强烈霓虹光晕。

简单生物可以使用黑色轮廓，但轮廓必须粗细不一、断续、抖动，不能形成光滑均匀的卡通描边。蝴蝶、章鱼、汉堡和巨口都应像临时画出来的儿童涂鸦或独立动画原画，而不是商业表情包。

动画必须跟随真实摄影机透视：

靠近镜头时快速变大，远离时明显缩小；
经过门框、手臂、桌面和冰箱门时产生正确遮挡；
摄影机甩动时，动画同样出现运动模糊和短暂拖影；
动画不能永远保持居中，允许从画面边缘进入、部分出画或被镜头裁切；
贴在墙面和电脑上的图形必须跟随表面透视，不得平行悬浮在屏幕上。
0—2秒｜白色笔触缠绕手臂

镜头从昏暗客厅开始，构图略微向左倾斜。右下角只能看到电脑屏幕的一部分，房间深处是黑暗窗户、餐桌和暖黄色壁灯。

人物抬起右臂，摄影机因身体重心变化产生轻微下沉和侧移。食指在空中画出弧线，一条粗糙白色干刷笔触从指尖实时生长。

白线不描绘手臂外轮廓，而是像松弛绳索一样穿过手指之间，绕到手掌后方，再连续缠绕手腕和前臂。绕到手臂背面的部分被皮肤自然遮挡。白线每一帧都轻微抖动，局部露出刷毛和颜料缺口。

人物张开手掌，一颗不规则的黄色手绘五角星从掌心弹出。星星边缘粗糙，内部可见多次涂抹的蜡笔纹理，不能是平滑纯色图标。

2—4.3秒｜星星进入电脑并冲出蓝色笔触

人物用手指做出捏住星星的动作，随即快速向右下方甩手。摄影机慢半拍低头追随，产生明显的向下甩镜、边缘拉伸和短暂运动模糊。

黄色星星拖着两条手绘尾迹飞向电脑。电脑不要正对镜头居中，而是以倾斜透视出现在画面下方。星星落入屏幕后，沿屏幕表面拖出粗糙红线，快速画成一个不对称的红色爱心。

红色爱心内部被多层凌乱笔触填满。青蓝色干刷笔触围绕爱心快速旋转，部分笔触超出屏幕边缘。摄影机进一步贴近屏幕，画面允许裁掉部分键盘与屏幕边框。

蓝色与黄色笔触突然从电脑屏幕边缘向上冲出，摄影机立即快速抬头跟随。粗大笔触近距离擦过镜头，短暂占据画面大部分区域，能看见粗糙刷毛与不均匀颜料，不要将其做成柔软塑料丝带。

4.3—6.3秒｜笔触变成蝴蝶并引导转身

蓝黄色笔触在米棕色墙面附近收缩成两只松散的白蓝色手绘蝴蝶。蝴蝶只是由几笔快速涂出的翅膀轮廓组成，没有精细纹路，没有均匀黑边。

蝴蝶一只近、一只远，快速扇动翅膀飞向过道。近处蝴蝶短暂从镜头左侧擦过并被裁切，摄影机立即转身追赶。转身带有约90度快速甩镜、强烈方向模糊和一次小幅过冲，不能平滑旋转。

摄影机向过道行走，伴随连续两三次脚步起伏。蝴蝶经过门框时被门框遮挡一部分，随后在另一侧重新出现。房间亮度随着进入过道自然下降。

6.3—9.5秒｜粉色线条与小章鱼

其中一只蝴蝶在壁灯附近化为一小段粉色蜡笔线。粉线沿着墙壁快速生长，绕过墙角和门框，在真实空间中形成几个松散的大弧线和螺旋。

摄影机边走边跟随粉线，画面略微倾斜，前景门框从镜头旁快速掠过。粉色线条非常接近镜头时只显示局部粗笔触，不能始终完整居中展示。

线条末端长出两个简单白眼睛和数条短触手，变成一只体积很小的粉色章鱼。章鱼只占画面宽度约5%—8%，悬浮在走廊远处上下弹跳，不要生成巨大的精致卡通角色。

章鱼向冰箱方向移动，旁边连续闪现几根手绘黄色箭头。箭头形状歪斜、笔触粗糙，出现后迅速擦除。摄影机跟着章鱼快速靠近冰箱，脚步频率提高，镜头抖动略微增强。

9.5—12.3秒｜冰箱中的汉堡怪物

人物右手伸向冰箱把手，摄影机因身体靠近产生轻微碰撞式晃动。拉开冰箱门后，冷白色灯光突然出现，画面先短暂过曝，随后自动曝光快速压低。

冰箱内部不能崭新空旷，应摆放饮料罐、塑料容器、瓶子和剩余食物。中央偏后的隔板上站着一只较小的手绘汉堡，只占冰箱内部面积约15%，不能直接以大特写居中出现。

汉堡拥有橙黄色面包、红色番茄、绿色生菜、两个不对称圆眼睛和细小手脚。颜色保留蜡笔涂抹纹理，黑色轮廓不断轻微跳动。

汉堡先无辜晃动，随后上下两层面包突然裂开，露出深色嘴巴和两排大小不一的粗糙白色三角牙齿。怪物向前跳动一次，摄影机受到惊吓迅速后退并向一侧歪斜。

人物立刻推上冰箱门。门板从画面右侧快速扫过，产生真实遮挡、撞击震动和短暂模糊。不要将怪物长期正面居中展示。

12.3—15秒｜手绘眼睛与巨口袭击

冰箱门关闭后，摄影机立即快速转身。转身约120度，带有明显手持甩镜、滚动快门倾斜和暗部拖影。镜头停止时略微超过目标位置，再向回摆动一点。

客厅墙面上出现一只粗糙的白色手绘眼睛。眼睛由几笔不闭合的白色干刷轮廓组成，内部是简单的青蓝色虹膜和黑色瞳孔。不要画成写实眼睛，不要睫毛、眼球高光和精致渐变。

瞳孔快速左右寻找，随后突然看向镜头。摄影机产生紧张的轻微后退和不稳定呼吸。

眼睛下方，一条荧光粉色粗线快速向两侧延伸，形成巨大的弯曲嘴巴。嘴巴内部是粗糙深色涂抹，两排白色三角牙齿大小不同、排列歪斜，边缘保留明显粉笔颗粒。

巨口先停顿约0.2秒，随后突然脱离墙面扑向镜头。摄影机受到惊吓猛烈后仰，画面快速抖动。巨口在最后0.6秒内产生极强透视放大，只有部分粉色嘴角与白色牙齿进入画面，其余部分被画面边缘裁切。

画面在牙齿即将咬合镜头的瞬间直接结束，不淡出、不黑场、不出现文字。

音效

不生成对白，不使用旋律明显的配乐。保留夜晚室内底噪、脚步、呼吸、衣物摩擦、冰箱门和手部挥动声。MG动画配合蜡笔摩擦、干刷扫过、弹性伸缩、纸张拍动和短促卡通撞击声。最后巨口扑来时加入快速增强的低频冲击和空气破风声。

强制限制

真实背景不能具有3D渲染、游戏场景、塑料模型或AI样板间质感；墙壁、木材、皮革、皮肤和冰箱必须是哑光、自然、不完美的实拍材质。镜头不能稳定如云台，不能全程水平，不能每个主体都自动居中。

手臂不能出现卡通白边、描边或抠图轮廓；白色动画只能缠绕手臂，不能沿皮肤边缘勾线。

MG动画不能使用光滑贝塞尔曲线、均匀描边、纯净矢量填色、渐变塑料、3D厚度、镜面高光、柔软投影、高清商业卡通或表情包风格。不要让蝴蝶和章鱼变得过大、过度精致、始终面对镜头。不要人物面部、字幕、Logo、水印、闪白转场或普通硬切。
```

</details>

<a id="image-reference"></a>
## 🖼️ Image reference

> Keep a character, product or style from up to ten pictures by calling them Image1, Image2 and so on. · 15 cases

<a id="image-reference-01"></a>
### 18. Rainy Platform Goodbye

`wan3.0-reference-video` · 20s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-01#image-reference-01)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

One storyboard reference drives six shots of a rainy platform parting, ending with a note and a train's headlights.

<table>
<tr><th>Image1</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-e19771794dc9.webp" width="220" alt="Image1"></td><td align="center"><video src="https://github.com/user-attachments/assets/4703cf34-2f41-4880-8c56-61e0e71a41b3" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Referencing the storyboard image @Image1, Shot 1: a wide view of a small rainy-night railway platform. A long-haired girl holding a blue umbrella stands alone on the platform, with warm light glowing from the little station house behind her, and distant green hills fading into the rain mist. Shot 2: medium shot. The girl with the umbrella and a short-haired boy carrying a schoolbag stand face to face on the platform, heavy rain pouring down, with the railway tracks stretching out between the two of them. Shot 3: through the transparent umbrella surface as raindrops slide down it, a close-up of the girl's face. Her eyes are reddened, and she softly says {Remember to send me a message when you get there}. Shot 4: an over-the-shoulder shot from behind the boy toward the girl. In the distance a train slowly approaches with its headlights on, the light haloing outward through the curtain of rain. Shot 5: close-up of two hands. The girl hands a folded note to the boy, her fingertips trembling slightly. Shot 6: the girl stands alone at the edge of the platform, watching the tracks stretch into the distance. The boy is no longer beside her, and the rain is gradually easing.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
参考 @Image1 的分镜图，镜头1：雨夜小火车站台全景，长发女孩撑蓝色雨伞独自站在站台上，身后小站房透出暖光，远处青山隐没在雨雾中；镜头2：中景，女孩撑伞与背书包的短发男孩在站台上面对面站立，大雨倾盆，铁轨在两人之间延伸；镜头3：透过雨滴滑落的透明伞面拍摄女孩面部特写，她眼眶泛红，轻声说{到了那边记得发消息}；镜头4：从男孩背后越肩拍向女孩方向，远处一列火车亮着车头灯缓缓驶来，雨幕中光晕扩散；镜头5：双手特写，女孩将一张折叠的纸条递到男孩手中，指尖微微颤抖；镜头6：女孩独自站在站台边，目送铁轨延伸向远方，男孩已不在身旁，雨势渐弱。
```

</details>

<a id="image-reference-02"></a>
### 19. Five Headpieces Flip Card Showcase

`wan3.0-reference-video` · 10s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-02#image-reference-02)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Five reference portraits flip like cards on a fixed frame, each pausing to show its traditional headpiece details.

<table>
<tr><th>Image1</th><th>Image2</th><th>Image3</th><th>Image4</th><th>Image5</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-796b3857ac66.webp" width="150" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-5d2f982940ec.webp" width="150" alt="Image2"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-969e6ff571b2.webp" width="150" alt="Image3"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-69ed6ad1cbd7.webp" width="150" alt="Image4"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-ce0ddf52a811.webp" width="150" alt="Image5"></td><td align="center"><video src="https://github.com/user-attachments/assets/3434e753-c157-41f4-b533-222924af1c62" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Referencing the 5 uploaded keyframe images, generate a 10-second, 16:9 landscape short video showcasing guochao-style character headpieces. The overall style continues the rhythm and display logic of the reference video, with a refined, clean, restrained look and a sense of fashionable Chinese-style visual design. The five characters appear in the order of the uploaded images. Each character stays fixed at the exact center of the frame, with a stable composition: no character movement, no large camera moves, no exaggerated body gestures. Each character holds for about 2 seconds, with the main motion being a slight side-to-side head turn, a slow tilt of the head, or a slight lift and return of the chin, so the headpiece is fully displayed. Tassels, flowers, magpies, paper kites, butterflies, and other headpiece decorations may sway or tremble slightly, while the Chinese patterns in the background, such as auspicious clouds, pavilions and towers, and landscape motifs, remain relatively still, with only a very slight breathing or parallax feel.

Transitions between characters must use a unified “horizontal card-flip” style: the current character's image is like a card standing upright at the center, performing a smooth horizontal flip around the vertical central axis. When it reaches the side, it briefly narrows, then the next character naturally emerges from the other side of the flip, forming a continuous card-turning effect. The transition should be clean, crisp, and smooth with a clear rhythm, without scattering, scaling jumps, or characters flying in from the edges. During transitions, character positions must not drift; they stay center-aligned, as if constantly flipping cards to change characters on the same display stand.

Each character's individual motion requirements: the character stays in a half-body portrait display, with natural eyes, calm and refined expression, and a stable overall body. Only the head turns slightly to the left and then back to center, or to the right and then back to center, with small, elegant movements that show the layers of the headpiece. Earrings, tassels, flower sprigs, bird feathers, and paper-kite details may swing with a slight delay to enhance refinement. No talking, no exaggerated blinking, no laughing, no large body twists.

The overall camera language is mainly fixed shots, with only a very slight slow push-in allowed to create a premium poster-like sense of motion, without breaking the centered display of the characters. The overall video rhythm is “hold display — horizontal card flip — hold display — horizontal card flip,” repeating through five characters, and finally settling on the last character to end.

Storyboard timeline version
0s–2s

The first character is displayed at the center.
The character slightly turns the head from frontal toward one side, then slowly returns to center, showing the flower, magpie, and tassel headpiece on top of the head.
Tassels and small ornaments sway slightly, while the background pattern stays stable.

2s–2.4s

Enter the first card-flip transition.
The current character's image performs a horizontal flip around the vertical central axis, like a card turning over. At its narrowest point it naturally switches to the next character.
During the flip the character stays fixed at the center.

2.4s–4.4s

The second character is displayed at the center.
The profile character may make a slight chin lift, a small head turn, or a gentle turn back a little, then stop, highlighting the paper kite, flowers, and magpie headpiece.
Petals or small ornaments may float very slightly.

4.4s–4.8s

Second card-flip transition.
Same horizontal card-flip style, clean and crisp, with no extra effects.

4.8s–6.8s

The third character is displayed at the center.
The character slightly shakes the head side to side, briefly showing the different layers of the exaggerated headpiece.
The birds, paper kites, and tassels in the headpiece may have subtle sways, while the cloud pattern in the background has a slight breathing feel.

6.8s–7.2s

Third card-flip transition.
Keep the unified center card-flip rhythm.

7.2s–8.6s

The fourth character is displayed at the center.
The character tilts the head slightly, revealing the front and side layers of the headpiece, with small, restrained movement.

8.6s–9.0s

Fourth card-flip transition.
Horizontal flip, with the character not drifting and a steady rhythm.

9.0s–10s

The fifth character is displayed at the center and serves as the ending.
The character slightly lifts the head or slowly turns and returns to center, with small headpiece elements gently swaying.
Finally stops steadily and freezes at the end.
Do not let characters walk around, do not let characters drift by scaling, do not deform the headpieces, do not change the character's position, do not let the background fly around, no complex particles, no exaggerated camera rotation, no stuttering, no multiple people on screen at once.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
参考上传的5张关键帧图片，生成一支10秒、16:9横版的国风人物头饰展示短视频。整体风格延续参考视频的节奏与展示逻辑，画面精致、干净、克制，带有时尚国风与中式视觉设计感。5位人物按照上传顺序依次出场，人物始终固定在画面正中央，构图稳定，不要人物跑位，不要大幅运镜，不要夸张肢体动作。每位人物停留约2秒，主要动态为轻微左右摇头、缓慢偏头、微微抬颌或回正，让头饰得到充分展示。头饰上的流苏、花朵、喜鹊、纸鸢、蝴蝶等装饰可以有轻微摆动或颤动，背景中的中式纹样如祥云、亭台楼阁、山水纹样保持相对静止，仅有极轻微的呼吸感或视差感。

人物之间的切换方式要统一为“水平翻牌式切换”：当前人物画面像一张竖立在中心的卡片，围绕竖直中轴做平滑的水平翻转，翻到侧面时短暂变窄，随后下一位人物从翻转的另一面自然出现，形成连续的卡牌翻面效果。切换过程干净利落、平滑顺畅，节奏清晰，不要飞散，不要缩放乱跳，不要人物从边缘飞入。切换时人物位置不能偏移，始终保持中心对齐，像在同一个展示台上不断翻牌更换不同人物。

每一位人物的单独动态要求如下：人物保持半身肖像式展示，眼神自然，表情平静高级，身体整体稳定，只有头部轻微向左偏转再回正，或向右偏转再回正，动作幅度小而优雅，用来展示头饰层次。耳饰、流苏、花枝、鸟羽、纸鸢细节可以随动作产生轻微延迟摆动，增强精致感。不要说话，不要夸张眨眼，不要大笑，不要大幅度扭身。

整体镜头语言以固定镜头为主，可有极轻微缓慢推进，营造高级海报动态感，但不能破坏人物始终居中的展示效果。视频整体节奏是“停留展示—水平翻牌—停留展示—水平翻牌”，重复5位人物，最终在最后一位人物上稳定停留结束。

分镜时间轴版
0s - 2s

第一位人物居中展示。
人物轻微将头从正面偏向一侧，再缓慢回正，展示头顶花朵、喜鹊与流苏头饰。
流苏和小装饰轻微摆动，背景纹样保持稳定。

2s - 2.4s

进入第一次翻牌切换。
当前人物画面围绕竖直中轴做水平翻转，像卡片翻面一样，翻到最窄处后自然切换到下一位人物。
翻转时人物仍固定在中心。

2.4s - 4.4s

第二位人物居中展示。
侧脸人物可做轻微抬颌、微小回头或轻轻转回一点，再停住，突出纸鸢、花朵和喜鹊头饰。
花瓣或小装饰可以极轻微漂浮。

4.4s - 4.8s

第二次翻牌切换。
同样采用水平翻牌式过渡，干净利落，不要多余特效。

4.8s - 6.8s

第三位人物居中展示。
人物轻微左右摇头，小幅展示夸张头饰的不同层次。
头饰中的鸟、纸鸢、流苏可有细微摆动，背景云纹轻微呼吸感。

6.8s - 7.2s

第三次翻牌切换。
继续保持统一的中心翻牌节奏。

7.2s - 8.6s

第四位人物居中展示。
人物轻微偏头，露出头饰正面与侧向层次，动作幅度小，精致克制。

8.6s - 9.0s

第四次翻牌切换。
水平翻转，人物不偏移，节奏平稳。

9.0s - 10s

第五位人物居中展示并作为结尾。
人物轻微抬头或缓慢转头回正，头饰小元素轻轻晃动。
最后稳定停住，定格结束。
不要人物走动，不要人物缩放漂移，不要头饰变形，不要人物位置变化，不要背景乱飞，不要复杂粒子，不要夸张镜头旋转，不要卡顿，不要多人同屏。
```

</details>

<a id="image-reference-03"></a>
### 20. Dragonfly-Style Micro Flyer Chase

`wan3.0-reference-video` · 10s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-03#image-reference-03)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Single continuous shot in a toy room: a micro flyer darts like a dragonfly, hover-burst-stop, down to an underwater space.

<table>
<tr><th>Image1</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-b60962b75b7f.webp" width="220" alt="Image1"></td><td align="center"><video src="https://github.com/user-attachments/assets/a7006aad-5682-4034-a602-1ba35ac14473" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Generate a 10-second, 16:9 landscape, 1920×1080, 30fps miniature fantasy high-speed chase short, completed in a single continuous shot.

Highest-priority requirement: the fairy must move the way a dragonfly does: “hover at a fixed point — instant burst — full sudden stop — sharp-angle change of course.” It is forbidden to portray her as an ordinary fairy drifting slowly, moving at constant speed, or gliding smoothly and continuously. Style reference: @Image2

Across the first 7.8 seconds of the whole piece, there must be at least six clearly recognizable explosive movements. Each burst must cross 60%–90% of the frame width within 3–5 frames, and after arriving at the new position she must come to a complete stop for 2–4 frames. During the dash, only 1–2 frames of a pink body afterimage and transparent wing trails may remain, and after the sudden stop the character must instantly return to being sharp.

The visual effect should closely resemble a real dragonfly:

hover at a distant point → suddenly cross several meters → instantly settle at another point → change body orientation → burst toward a completely different direction.

This is not a continuous flight path, but a series of short, sharp, nearly frame-skipping high-speed displacements connected together. The character must not fill the duration with ordinary slow flight.

Character design

Only the same adult miniature flyer appears throughout the whole piece, about 15–20 centimeters tall:

light golden short hair;
a light pink thin short skirt;
bare lower legs;
two pairs of slender, semi-transparent dragonfly wings;
the wings have fine veins and slight iridescence;
stable body proportions;
mainly shown from the back and back-side angles;
no close-up of the face.

She is not a child character, and she does not adopt a cute ballet-like floating pose.

When hovering, the body is close to vertical, and the four wings vibrate at high frequency. Before a burst launches, within 1–2 frames the body quickly lowers and turns into a horizontal forward-leaning posture, with the head, chest, and toes pointing in the direction of flight.

When stopping suddenly, the body quickly rises, the legs swing forward to cancel momentum, and the wings open outward to brake. After the sudden stop is complete, the body must be completely still, with only the wings keeping high-frequency vibration.

Setting

A real, warm, slightly messy children's toy room:

beige short-pile carpet;
warm grey-green walls;
wooden storage cabinets;
a red toy truck;
a green small car;
a brown plush bear;
white plush animals;
scattered picture books and building blocks;
a large colorful block castle at the far end of the room.

The block castle is built from large yellow, blue, green, and red plastic blocks, with towers, city walls, doorway openings, and visibly loose structure.

Behind the castle connects a deep-blue underwater space, with a bright water surface above, blue-white volumetric light, a few aquatic plants, pale sand floor, and rising bubbles.

Camera rules

The camera must not lock onto the character all the time, and must not keep a fixed distance from her.

Each burst follows this fixed logic:

the camera briefly holds steady to observe the hovering fairy;
the fairy suddenly rushes toward the frame edge within 3–5 frames;
the character is allowed to fully leave the frame for 2–4 frames;
the camera is 0.1–0.2 seconds slower before whipping quickly toward the new direction;
the camera may briefly overshoot the character's stopping position;
then it makes a small reverse adjustment to rediscover the fairy, who is now fully hovering;
after holding for 2–4 frames, the character bursts again.

There must be multiple instances of the visual relationship where “the character has already arrived and stopped, while the camera is still catching up.”

The camera must not keep the fairy always at the center, always sharp, or always at the same size. During a dash, the character can shrink quickly from a near shot into a distant pink dot, or suddenly sweep past the edge of the lens from far away.

Motion requirements

Every dash must show at least three kinds of speed evidence at the same time:

the fairy's position on screen changes dramatically;
the character's size changes rapidly;
foreground toys sweep past at high speed;
the carpet texture forms directional streaks;
the camera shows a delayed whip;
air pushes the edges of paper;
the wings form high-frequency transparent fan-shaped afterimages;
after the dash ends, the character suddenly snaps into sharp focus.

It is forbidden to express high speed only through rapid wing vibration. There must be clear evidence that the character truly crosses an obvious spatial distance.

10-second timeline
0–0.7 seconds | Fixed observation and first crossing

The lens is about 5 centimeters from the carpet and temporarily stays roughly fixed.

The fairy hovers on the left side of the frame, body clearly visible, wings vibrating at high speed. After holding for about 0.12 seconds, she suddenly lowers her body and bursts horizontally.

The first burst must cross from the left side of the frame to the right within about 0.13 seconds, 4 frames, covering about 85% of the frame width. Only an extremely short pink directional afterimage remains in between.

The fairy rushes out of the right side of the frame. The camera stays in place for about 2 frames, then violently whips to the right.

0.7–1.5 seconds | Catching up and first sudden stop

The camera quickly whips right and finds the fairy again above the green toy car.

By this time the fairy has fully stopped, about 10 centimeters above the top of the toy car. Due to inertia the camera overshoots her slightly, then quickly adjusts back to the left.

The fairy holds steady and clear for about 3 frames, then bursts at about a 90-degree angle to the left-forward, passing extremely close in front of the camera. The character instantly changes from a small distant figure into a pink blurred close-up occupying about 25% of the frame height, then disappears from the left side.

1.5–2.6 seconds | Two consecutive dragonfly-style course changes

The camera whips left to chase.

The fairy stops instantly for 2–3 frames beside the plush bear's shoulder, and her body quickly turns toward the depths of the room. Then two bursts follow:

Third burst: from beside the plush bear, she rushes to the back of the red toy truck, completed in about 4 frames;
sudden stop for 3 frames;
Fourth burst: she leaps up and to the right across the picture books and scattered blocks, completed in about 3 frames.

The stopping positions between each burst must be 1–2 meters apart, not just a few tens of centimeters. The camera catches up half a beat late each time, creating obvious left-right whipping and spatial jumps.

2.6–3.8 seconds | Ultra-fast long-distance burst

The block castle is at the end of the room.

The fairy suddenly and completely hovers above the foreground blocks. The camera also briefly stops, and the frame goes quiet for about 0.12 seconds.

Then the fairy completes her fifth burst, the longest-distance movement of the whole piece:

her body instantly turns horizontal;
her wings become translucent fan shapes;
within about 0.2 seconds she crosses the main distance of the room;
she shrinks rapidly from about 18% of the frame height to less than 3%;
she arrives directly before the castle entrance far away;
the camera stays in place for about 3 frames before suddenly accelerating.

Foreground toys, chair legs, picture books, and carpet texture sweep backward at high speed. As the camera closes in, the castle expands from a distant view in an instant, filling the entire frame.

3.8–5 seconds | Three jumps along the castle walls

The fairy does not climb continuously up the wall. Instead, she jumps instantly between three clearly defined positions:

hovers at the base of the castle wall;
bursts within 3 frames to a middle-level tower;
stops completely for 2 frames;
bursts sideways within 4 frames to another tower;
stops for 2 frames;
bursts vertically within 3 frames to the highest point.

After each arrival, the fairy stops completely at once, as if pinned in the air, and does not slow down by gliding.

The camera searches for her by sharply tilting up, quickly panning sideways, and making short turns in sequence. Colorful blocks sweep past from both sides of the lens at high speed. The lens may temporarily lose the character, but must recapture her.

5–6.3 seconds | Reverse dive and castle collapse

After reaching the top of the tower, the fairy hovers for only about 0.1 seconds, then suddenly completes her sixth burst downward, turning back at about 110 degrees.

She dives at high speed from above, grazes a loosely connected block, and plunges into the inside of the castle. The character herself does not hit the wall, but the rapid airflow and the grazing contact make the block structure lose stability.

The castle collapses in sequence:

the large top blocks tilt first;
the middle-layer blocks fall under gravity;
small pieces then tumble and bounce;
different blocks have different directions and speeds of motion.

The fairy performs two left-right evasions of 3–4 frames each among the fragments. The camera whips half a beat late, moving through the gaps between the large blocks.

6.3–7.8 seconds | Debris passage and high-speed dive

A deep-blue opening is revealed inside the castle.

The fairy suddenly stops sharply in front of the opening, her body fully fixed for about 3 frames. The camera, due to inertia, first rushes forward and nearly reaches her.

In the next instant, the fairy bursts vertically downward and quickly rushes out of the bottom of the frame. The camera lags about 0.15 seconds before flipping down 80 degrees to chase.

The character, the blocks, and the camera fall at high speed. As they pass the water surface boundary, there are realistic refraction, splashes, bubbles, and 2–3 frames of brief defocus.

7.8–9 seconds | Water resistance forces deceleration

Once underwater, the rules of motion change immediately.

The fairy's body, which was moving downward at high speed, experiences strong water resistance within 0.3 seconds:

her forward distance shortens rapidly;
her body tilts forward about 20 degrees;
her legs and arms keep swinging from inertia;
her hair and skirt float upward;
her wings stop vibrating at high speed;
all four wings open and sway slowly.

The camera glides forward a small distance from its high-speed chase state, then gradually stabilizes. Bubbles rise uniformly, and block fragments slowly rotate as they sink.

9–10 seconds | Complete stillness and ending

The fairy stops completely underwater, floating slightly above the center of the frame.

The camera still moves closer by about 20 centimeters from inertia, then comes to a complete stop. The fairy slowly turns toward the blue light column ahead, her skirt and wings gently swayed by the water currents.

For the final 0.4 seconds, hold a stable image:

the fairy no longer moves forward;
bubbles rise;
the aquatic plants slowly rebound;
the blocks keep sinking;
soft caustic light appears on the water surface above;
no fade to black.

Forced speed limit

In the air there must be at least six complete “burst–sudden stop” sequences. Each burst crosses no less than 60% of the frame width, and each sudden stop must show 2–4 frames of a completely sharp, completely still character image.

Do not use slow takeoff, gradual acceleration, smooth deceleration, or continuous curved flight. Do not let the fairy move forward standing upright like an ordinary fairy. Do not let her move through the air with running, swimming, or bird-like gliding motions.

The fairy is allowed to briefly rush out of the frame, the camera is allowed to temporarily lose the character, and during the dash stage the character may appear as only 1–2 frames of a pink directional afterimage.

Do not fix the camera behind the character, and do not let the two keep the same speed, distance, or composition. The camera must always be clearly slower than each of the fairy's starts.

The high-speed effect must not rely only on motion blur, wing vibration, or background movement. It must show real positional jumps, scale changes, camera catch-up, and instant sudden stops.

The character must never truly disappear or teleport out of thin air. Between each positional jump, keep 1–2 frames of continuous directional afterimage so that the spatial route can still be traced.

The whole piece keeps the same continuous shot, with no hard cuts. Keep the character design, wing count, and body structure stable. No limb distortion, no disappearing wings, no character duplication, no blocks turning to powder, no flames, smoke, glowing trails, magic particles, text, logos, or watermarks. @Image1
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
生成一支10秒、16:9横版、1920×1080、30fps、单镜头连续完成的微缩奇幻高速追逐短片。

最高优先级要求：小精灵必须采用蜻蜓式“定点悬停—瞬间弹射—完全急停—锐角变轨”的运动方式。禁止将其表现为普通仙女缓慢漂浮、匀速前进或连续平滑滑翔。参考图风格： @Image2

全片前7.8秒至少出现六次清晰可辨的爆发移动。每次弹射必须在3—5帧内跨越画面宽度的60%—90%，到达新位置后立即完全停止2—4帧。冲刺过程只留下1—2帧粉色身体残影和透明翅膀拖影，急停后的角色必须瞬间恢复锐利。

视觉效果接近真实蜻蜓：

远处定点悬停 → 突然跨越数米 → 在另一处瞬间定住 → 改变身体朝向 → 再向完全不同的方向爆发移动。

这不是连续飞行路径，而是由多个短促、锐利、近乎跳帧的高速位移连接而成。角色不能用普通缓慢飞行填充时长。

角色造型

全片只出现同一位成年微型飞行者，身高约15—20厘米：

浅金色短发；
浅粉色轻薄短裙；
裸露小腿；
两对狭长半透明蜻蜓翅膀；
翅膀具有细密翅脉和轻微虹彩；
身体比例稳定；
主要展示背面与侧背面；
不出现面部特写。

她不是儿童角色，不采用可爱芭蕾式悬浮姿态。

悬停时身体接近竖直，四片翅膀高频振动；爆发启动前，身体在1—2帧内迅速压低并转为水平前倾姿态，头部、胸口与脚尖指向飞行方向。

急停时身体快速抬起，双腿向前摆动抵消惯性，翅膀向两侧展开制动。急停完成后身体必须完全静止，只有翅膀保持高频振动。

场景

真实、温暖、略显凌乱的儿童玩具房：

米黄色短绒地毯；
暖灰绿色墙面；
木质收纳柜；
红色玩具卡车；
绿色小汽车；
棕色毛绒熊；
白色毛绒动物；
散落的绘本和积木；
房间尽头的大型彩色积木城堡。

积木城堡由黄、蓝、绿、红色大型塑料积木搭建，具有塔楼、城墙、门洞和明显松动结构。

城堡之后连接一座深蓝色水下空间，上方有明亮水面、蓝白体积光、少量水草、浅色沙地和上升气泡。

摄影机规则

摄影机不能一直锁定角色，不能与角色保持固定距离。

每次弹射采用以下固定逻辑：

摄影机短暂稳定观察悬停的小精灵；
小精灵先在3—5帧内突然冲向画面边缘；
角色允许完全冲出画面2—4帧；
摄影机慢0.1—0.2秒才快速甩向新方向；
摄影机可能短暂越过角色的停止位置；
随后反向微调，重新发现已经完全悬停的小精灵；
停留2—4帧后，角色再次弹射。

必须多次出现“角色已经到达并停止，摄影机仍在追赶”的视觉关系。

摄影机不能让小精灵始终处于中央、始终清晰、始终保持相同大小。冲刺时角色可从近景迅速缩成远处粉色小点，也可以从远处突然掠过镜头边缘。

运动画面要求

每次冲刺都必须同时出现至少三种速度证据：

小精灵屏幕位置大幅改变；
角色大小迅速改变；
前景玩具高速掠过；
地毯纹理形成方向性拖影；
摄影机产生延迟甩动；
空气推动纸张边缘；
翅膀形成高频透明扇形残影；
冲刺结束后角色突然锐利定格。

禁止只用翅膀快速振动表现高速。必须看到角色真正跨越明显空间距离。

10秒时间轴
0—0.7秒｜固定观察与第一次横穿

镜头距离地毯约5厘米，暂时保持近似固定。

小精灵悬停在画面左侧，身体清晰，翅膀高速振动。保持约0.12秒后，她突然压低身体并水平弹射。

第一次弹射必须在约0.13秒、4帧内从画面左侧横穿到右侧，跨越画面宽度约85%。中间只留下极短的粉色定向残影。

小精灵冲出画面右侧，摄影机继续停留在原位置约2帧，随后猛然向右甩动。

0.7—1.5秒｜追回与第一次急停

摄影机快速向右甩动，在绿色玩具车上方重新找到小精灵。

此时小精灵已经完全停止，距离玩具车顶部约10厘米。摄影机因惯性略微越过她，再快速向左回调。

小精灵保持清晰悬停约3帧，随即以约90度夹角向左前方弹射，从摄影机前方极近掠过。角色瞬间从小型远景变成占画面高度约25%的粉色模糊近景，再从左侧消失。

1.5—2.6秒｜连续两次蜻蜓变轨

摄影机向左甩动追赶。

小精灵在毛绒熊肩膀旁瞬间停止2—3帧，身体迅速转向房间深处。随后完成两次爆发：

第三次弹射：从毛绒熊旁冲到红色玩具卡车后方，约4帧完成；
急停3帧；
第四次弹射：向右上方跨越绘本和散落积木，约3帧完成。

每次停止位置之间相隔1—2米，不能只移动几十厘米。摄影机每次慢半拍追赶，画面产生明显左右甩动和空间跳跃。

2.6—3.8秒｜远距离超高速弹射

积木城堡位于房间尽头。

小精灵在前景积木上方突然完全悬停。摄影机也短暂停止，画面安静约0.12秒。

随后小精灵完成第五次、全片距离最长的爆发移动：

身体瞬间转为水平；
翅膀变成半透明扇形；
在约0.2秒内跨越房间主要距离；
从占画面高度约18%迅速缩小到不足3%；
直接到达远处城堡入口前；
摄影机仍停留在原位置约3帧后才突然加速。

前景玩具、柜脚、绘本与地毯纹理高速向后掠过。摄影机追近时，城堡从远景瞬间扩张，占据整个画面。

3.8—5秒｜城墙上的三段跳跃

小精灵不沿城墙连续上升，而是在三个明确位置之间瞬间跳跃：

城墙底部悬停；
3帧内弹射到中层塔楼；
完全停止2帧；
4帧内横向弹射到另一座塔楼；
停止2帧；
3帧内垂直弹射到最高处。

每次到达后，小精灵像被钉在空气中一样立即完全停止，不能减速滑行。

摄影机通过急剧抬头、快速横摆和短促回转依次寻找她。彩色积木从镜头两侧高速掠过，镜头可以暂时失去角色，但必须重新捕捉。

5—6.3秒｜折返俯冲与城堡坍塌

到达塔楼顶部后，小精灵只悬停约0.1秒，突然向下完成第六次弹射，折返角度约110度。

她从高处高速俯冲，擦过一处松动连接积木，穿入城堡内部。角色本身不撞墙，急速气流和擦碰使积木结构失去稳定。

城堡依次坍塌：

顶部大块首先倾斜；
中层积木受重力掉落；
小块随后翻滚弹跳；
不同积木拥有不同运动方向和速度。

小精灵在碎片中连续做两次3—4帧的左右闪避。摄影机晚半拍甩动，在大块积木之间穿行。

6.3—7.8秒｜碎片通道与高速俯冲

城堡内部露出深蓝色洞口。

小精灵在洞口前突然急停，身体完全定住约3帧。摄影机因惯性先向前冲，几乎接近她。

下一瞬间，小精灵垂直向下弹射，迅速冲出画面底部。摄影机慢约0.15秒后才向下翻转80度追赶。

角色、积木和摄影机高速坠落。穿过水面边界时产生真实折射、水花、气泡和2—3帧短暂失焦。

7.8—9秒｜水阻强制减速

进入水下后，运动规则立刻改变。

小精灵原本高速向下的身体在0.3秒内受到强烈水阻：

前进距离迅速缩短；
身体向前翻转约20度；
双腿和手臂因惯性继续摆动；
头发和裙摆向上漂浮；
翅膀停止高速振动；
四片翅膀展开并缓慢摆动。

摄影机从高速追赶状态向前滑行少量距离，随后逐渐稳定。气泡统一向上，积木碎片缓慢旋转下沉。

9—10秒｜完全静止收尾

小精灵在水下完全停止，悬浮在画面中央偏上。

摄影机仍因惯性靠近约20厘米，随后完全停住。小精灵缓慢转向前方蓝色光柱，裙摆与翅膀受到水流轻轻摆动。

最后0.4秒保持稳定画面：

小精灵不再向前移动；
气泡向上；
水草缓慢回弹；
积木继续下沉；
上方水面产生柔和焦散；
不淡出黑场。
强制速度限制

空气中必须至少出现六次完整的“弹射—急停”。每次弹射跨越画面宽度不少于60%，每次急停必须出现2—4帧完全锐利、完全静止的角色画面。

不要使用缓慢起飞、逐渐加速、平滑减速或连续曲线飞行。不要让小精灵像普通仙女一样直立飘浮前进。不要让她以跑步、游泳或鸟类滑翔的动作在空中移动。

允许小精灵短暂冲出画面，允许摄影机暂时丢失角色，允许角色在冲刺阶段只呈现为1—2帧粉色方向性残影。

不要把摄影机固定在角色背后，不要让两者保持相同速度、距离和构图。摄影机必须明显慢于小精灵的每一次启动。

高速效果不能只依赖运动模糊、翅膀振动或背景移动，必须表现真实位置跳跃、尺度变化、摄影机追赶与瞬间急停。

角色不能真正消失或凭空传送。每次位置跳跃之间保留1—2帧连续方向性残影，使空间路线仍可追溯。

全片保持同一连续镜头，不使用剪辑硬切。保持角色造型、翅膀数量和身体结构稳定。不要肢体扭曲、翅膀消失、角色复制、积木粉末化、火焰、烟雾、发光轨迹、魔法粒子、文字、Logo或水印。 @Image1
```

</details>

<a id="image-reference-04"></a>
### 21. Two Cats, Four Absurd Scenes

`wan3.0-reference-video` · 20s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-04#image-reference-04)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Two cat references move through five timed absurd scenes, each built on symmetrical, meticulously staged framing.

<table>
<tr><th>Image1</th><th>Image2</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-a631a8c26b5f.webp" width="220" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-d53336b18710.webp" width="220" alt="Image2"></td><td align="center"><video src="https://github.com/user-attachments/assets/6e156395-5963-4159-9eb6-3dbdbbe47bed" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
0–4 seconds (wide / symmetrical freeze):
Frame: an endless luxury hotel corridor. In the exact center of the frame, a fluffy ragdoll cat @Image1 has all four legs off the ground, in a standard running pose, charging toward the lens. Its expression is serious and focused, as if carrying out a sacred mission. About two meters behind it on the right, a smaller black cat @Image2 runs with its back to the camera toward the depths of the corridor, but its head is dramatically twisted 180 degrees backward, its eyes wide open as it looks back at its pursuers.
Detail: both actions are frozen in a kind of “dynamic stillness,” like an exquisite clockwork toy. The arches, wall lamps, and carpet patterns in the background are all strictly symmetrical left to right.

4–9 seconds (side tracking / cross-section view):
Frame: the camera switches to a cross-section view of the corridor's side (as if the wall had been sliced open). The ragdoll cat runs in the foreground at a steady pace from left to right, its steps mechanical yet graceful; the black cat, in the midground, moves in reverse from right to left, creating crossing lines of motion.
Style: the background consists of layered pink wallpaper and gold picture frames, with every object kept perfectly vertical and horizontal, with no tilt at all. The fur textures of the two cats are extremely fine, forming a strong contrast with the flat color blocks of the background.

9–13 seconds [Laundry room / drum close-up]:
Frame: a frontal eye-level close-up focused on the glass door of a retro mint-green twin-tub washing machine. Ragdoll cat @Image1 and black cat @Image2 are trapped inside the rotating drum, tumbling with the water and foam.
Detail: the two cats do not panic, but keep a stiff “floating” posture, staring straight ahead with empty eyes, as if doing some weightlessness training. The background is neatly arranged rows of same-colored laundry detergent bottles, with labels strictly ordered according to the rainbow spectrum. Light refracts through the soap bubbles into dreamy light spots, and the motion is slow and rhythmic, like underwater ballet.

13–17 seconds [Luggage conveyor / overhead tracking]:
Frame: a 90-degree vertical overhead shot. A deep-red airport-style luggage conveyor belt runs across the frame. Ragdoll cat @Image1 sits upright on a brown leather suitcase covered with travel stickers, its paws folded on its knees, with a solemn expression like a noble on a journey. Black cat @Image2 lies on another smaller green hand luggage case, its body sliding steadily to the right with the conveyor, its tail swinging rhythmically left and right, as precise as a metronome.
Detail: both sides of the conveyor are pure white walls with no clutter at all. Every five seconds, an overhead light flashes once, matching the cats' movement rhythm to create a mechanical sense of order. The colors are mainly red, brown, green, and white, with sharp, clean contrast.

17–20 seconds [Telephone booth / mirror symmetry]:
Frame: frontal eye-level view, with the frame split in two by the glass door of an old-style red telephone booth. On the left is a close-up of the front face of ragdoll cat @Image1, facing the handset, its mouth slightly open as if speaking, with a sharp gaze. On the right is a mirror reflection of black cat @Image2 (or it is actually standing on the other side of the glass), imitating the ragdoll cat's movements, but with an expression of extreme terror and comedy, its eyes wide open.
Detail: the inside of the phone booth is small, and the background is a blurred city street, processed into soft color blocks. Reflections on the glass are clearly visible, enhancing the layers of space. The final frame freezes on the stark contrast between the two cats' expressions, with color saturation peaking, full of dramatic tension and absurd humor.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
0-4秒（全景/对称定格）：
画面：一条无限延伸的豪华酒店长廊。画面正中央，一只毛茸茸的布偶猫 @Image1 四肢腾空，呈标准的奔跑姿态冲向镜头。它的表情严肃而专注，仿佛在执行一项神圣任务。在它身后右侧约两米处，一只体型较小的黑猫 @Image2 正背对镜头向走廊深处狂奔，但头部夸张地向后扭转180度，瞪圆了眼睛回望追兵。
细节：两者的动作被凝固在一种“动态的静止”中，如同精致的发条玩具。背景中的拱门、壁灯、地毯花纹全部严格左右对称。
4-9秒（侧跟拍/剖面视角）：
画面：镜头切换至走廊侧面的剖面视角（仿佛墙壁被切开）。布偶猫在前景从左向右匀速跑过，步伐机械而优雅；黑猫在中景从右向左反向穿过，形成交叉动线。
风格：背景是层层叠叠的粉色墙纸与金色画框，所有物体都保持绝对的垂直与水平，没有任何倾斜。两只猫的毛发质感极其细腻，与背景平整的色块形成强烈对比。
9-13秒 [洗衣房/滚筒特写]：
画面：正面平视特写，聚焦于一台复古薄荷绿的双缸洗衣机玻璃门。布偶猫@图片1 和黑猫@图片2 被困在旋转的滚筒内，随着水流和泡沫翻滚。
细节：两只猫并未惊慌，而是保持着僵硬的“漂浮”姿态，眼神空洞地直视前方，仿佛在进行某种失重训练。背景是整齐排列的同色系洗衣液瓶，标签颜色按彩虹光谱严格排序。光线透过肥皂泡折射出梦幻的光斑，动作缓慢而富有节奏感，如同水下芭蕾。
13-17秒 [行李传送带/俯视追踪]：
画面：垂直90度俯拍。一条深红色的机场式行李传送带横贯画面。布偶猫@图片1 端坐在一个贴满旅行贴纸的棕色皮箱上，双手交叠放在膝盖，神情庄重如贵族出行；黑猫@图片2 则趴在另一个较小的绿色手提箱上，身体随传送带匀速向右滑动，尾巴有节奏地左右摆动，像节拍器一样精准。
细节：传送带两侧是纯白色的墙壁，没有任何杂物。每隔五秒，一盏顶灯闪烁一次，配合猫咪的移动频率，营造出机械般的秩序感。色彩以红、棕、绿、白为主，对比鲜明且干净利落。
17-20秒 [电话亭/镜像对称]：
画面：正面平视，画面被一扇老式红色电话亭的玻璃门一分为二。左侧是布偶猫@图片1 的正脸特写，它正对着听筒，嘴巴微张似乎在说话，眼神犀利；右侧是黑猫@图片2 的镜像倒影（或实际站在玻璃另一侧），它模仿着布偶猫的动作，但表情却是极度的惊恐和滑稽，眼睛瞪得极大。
细节：电话亭内部空间狭小，背景是模糊的城市街景，但被处理成柔和的色块。玻璃上的反光清晰可见，增强了空间的层次感。最后画面定格在两只猫截然不同的表情对比上，色彩饱和度达到峰值，充满戏剧张力与荒诞幽默感。
```

</details>

<a id="image-reference-05"></a>
### 22. Duel Among Reeds at Dusk

`wan3.0-reference-video` · 16s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-05#image-reference-05)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Two character-card references and a lakeside reed field: a bare-hand duel follows a short exchange, with only two slow-motion beats.

<table>
<tr><th>Image1</th><th>Image2</th><th>Image3</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-d4a80f9cb9fa.webp" width="220" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-65b8eaf75527.webp" width="220" alt="Image2"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-4a86516842a0.webp" width="220" alt="Image3"></td><td align="center"><video src="https://github.com/user-attachments/assets/066390d1-9b34-4f23-bb1e-5a9c3036fb35" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
1️⃣ Module 1 · Multimodal reference layer

Based on the uploaded character card, strictly keep the male character's features consistent: black hair in a high topknot, loose strands at the temples blown by the wind, sharp dark eyes, a lean face with clearly defined contours; strictly keep his styling details consistent: an off-white cross-collar robe as the inner layer, an outer black-grey frayed shoulder cape with tassels, multiple silver coin pendant chains on the chest, and a wide dark-brown sash wrapped around layered fabric. Based on the uploaded character card, strictly keep the female character's features consistent: long straight dark-brown hair with a slightly damp sheen scattered over one shoulder, a cool profile, and dark pupils; strictly keep her styling consistent: an olive-brown leather high-collar short fighting outfit, multiple leather belts crossing and binding the chest and abdomen, and a light-colored shirt collar worn underneath. The setting strictly follows the uploaded lakeside reed-flat image (golden reeds swaying in large waves in backlight at sunset, dark gravel and rock scattered across the ground, the lake far away glittering with fine waves, and the sky shifting from cyan to gold, forming a warm-cool transition band). Do not replace it or mix in other scene elements.

2️⃣ Module 2 · Global settings

Base environment and texture: a lakeside reed flat, golden reeds surging violently in large waves in the wind, dark rocks scattered in the near ground that can serve for leverage, leaping, and cover, the ground made of dry hard sand mixed with dead grass and gravel, the distant lake glittering, strong backlit grain, and a lot of floating reed fluff and dust in the air, with strong visual impact.
Visual style: cinematic realistic wuxia texture, with the backlit silhouette of a Grandmaster-style film placed alongside the open-field tension of a Crouching Tiger-style film. Warm golden backlight and cool blue sky collide in strong color temperature contrast, with high-contrast light carving the body outlines. Shallow and deep depth of field alternate to strengthen spatial depth and impact.
Camera language: the camera complexity of this version is significantly raised. The opening dialogue uses medium-close fixed shots to create the still tension of spoken confrontation. Once the fight begins, multiple camera positions switch rapidly (low-angle upward shots of the hand's silhouette, overhead diving dart-like shots showing the overall tangle, telephoto lenses compressing space to create a sense of closing in, handheld slight shake following close with the rhythm of short punches, and wide side orbits showing the exchange of positions). Speed ramps are allowed (normal speed abruptly pushes into a very short slow motion, then instantly snaps back to normal speed) to create impact at the moment of strikes. Across the whole piece, slow-motion or freeze-frame beats are relaxed to 2 times, each lasting no more than 1 second. Cut frequency is raised, but the axis and geometric relationships must remain continuous, with no reversed directions or position drift. The ending uses a slowly rising wide shot to close the emotion.
Character styling: the male character keeps the character-card settings; the shoulder cape with tassels and silver coin chains swing and clash with clear sounds during intense fighting, and the robe hem flips and tears under high-intensity footwork. The female character keeps the character-card settings; the leather straps stay close to the body without loosening, but her collar and hair whip violently with her movements, and her long hair flies high through repeated flips and dodges.
Performance core: the opening dialogue is concise and sharp, one line of provocation and one line of acceptance, with restrained tone but hidden killing intent. Fight passages demand moves that are fierce, continuous, and powerful: short punches, grappling throws, joint locks, and leverage-based flips erupt one after another. The rhythm should be denser and more visually impactful than a standard version, but every strike must still have clear force and feedback, avoiding empty motions done just for show. The whole piece is pure bare-hand close combat, with no weapons, spells, light effects, or other surreal special effects.
Dialogue and sound discipline: the whole piece keeps the characters' synchronized dialogue, with no on-screen subtitles. Dialogue appears only in the very short two-line exchange at the opening; throughout the fight there is no speech, only rapid breathing, the whoosh of fist wind, violent fabric friction, and heavy thuds of bodies landing. No background music. Ambient sound (howling wind, reeds rubbing violently, water waves) grows louder as the fight intensifies, and near the end a minimal accent can punctuate the final freeze.
Prohibited: no on-screen subtitles; no background music overpowering the scene; no face or costume clipping or deformation; no broken limbs or interpenetrating misalignment; no light blades, spell effects, or movements floating in the air beyond human mechanics; no more than 2 slow-motion or freeze-frame beats, and none longer than 1 second each; no camera switches that reset space or break the axis; no ritual gestures such as kneeling; no camera static for more than 1.5 seconds (a single fixed dialogue shot must not exceed 2 seconds).
Spatial choreography: build the movement path with three spatial anchors: the edge of the reed clump, the near rock cluster, and the lakeshore edge. After the dialogue, the scene rapidly moves from still to motion, bursting in from the outer edge of the reeds, shifting into the rock area for leverage flips and joint-lock tangling, and finally completing a climactic slam throw at the lakeshore edge and freezing to close. The fight lasts about 15 seconds, with camera intensity climbing step by step with the rhythm and then snapping to a stop.

3️⃣ Module 3 · Timestamped dramatic storyboard

【0–1.5 seconds】The male character stands at the edge of the reed clump, his backlit silhouette sharp, wind lifting the hem of his robe. The camera holds a fixed medium-close shot on him, and he speaks coldly: "Still want to stop me?"

【1.5–3 seconds】The camera cuts to a close-up of the female character, her hair blown by the wind half-covering her face, the corner of her lips sinking: "Try it and see." Before the words have finished, she has already taken the first step forward, and the fight abruptly explodes.

【3–4.5 seconds】The female character suddenly closes in, her right fist straight for his face. The male character turns his head to narrowly dodge. The camera switches from fixed to handheld close-in tracking, with a slight shake matching the rhythm of the punch, and reed fluff bursts between the two of them.

【4.5–6 seconds】The male character catches her wrist with one hand, using her momentum to pull her back. The female character follows the pull, twists to release the force, and counters with an elbow strike. The camera switches to a low-angle upward shot, capturing the silhouette of the two crossed arms and turning bodies.

【6–7.5 seconds】Speed-ramped slow motion (about 0.8 seconds): the female character's side kick grazes the male character's flank and narrowly misses. At the instant his garment billows violently, the shot is briefly magnified, then the camera speed snaps back to normal.

【7.5–9 seconds】Using the momentum of his dodge, the male character reaches back to seize her arm and tries to throw her. The female character lowers her body to release the force and rolls free. The camera switches to an overhead diving dart-style shot, showing the overall trajectory of the two rolling and tangling on the ground.

【9–10.5 seconds】The two almost simultaneously rise and close in again, with three quick exchanges in a row (straight punch, block, counter). The camera makes a large lateral orbit, with the axis kept continuous, showing their positions constantly exchanging.

【10.5–12 seconds】The female character uses a rock for leverage and leaps up suddenly, with a high kick straight for the male character's shoulder. He slides past sideways and seizes her calf in passing. The camera switches to a telephoto lens compressing the space, strengthening the sense of closing in and impact.

【12–13 seconds】The male character uses the momentum to pull hard. The female character uses the inertia to flip over and seizes his shoulder and neck from behind to lock him. The two are suddenly locked in close-contact struggle, and the camera rushes into a close-up of their tense arms and muscle lines.

【13–14 seconds】Speed-ramped second slow motion (about 1 second): the male character exerts force to flip and pin the female character, and the two lose balance and tip toward the edge of the rock area at the same time. The moment his robe and hair whip violently through the air is magnified and frozen, then the camera speed snaps back to normal.

【14–16 seconds】Normal speed resumes. The two tumble and fall onto the sand at the lakeshore edge, kicking up a large cloud of dust and spray. The camera dives and tracks along the path of the fall, with the impact pushed to the maximum.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
1️⃣模块一·多模态参考层

基于上传的角色卡，严格保持男性角色的黑发高发髻、鬓角碎发被风吹起、锐利深色瞳、清瘦而线条分明的面部轮廓特征一致；严格保持其灰白色交领长衫内衬、外披黑灰色破边流苏罩肩、胸前多重银币吊坠链饰、深棕色宽腰带缠绕层叠布料的造型细节一致。基于上传的角色卡，严格保持女性角色的深棕色长直发略带湿润感散落肩侧、清冷侧脸轮廓、深色瞳孔的特征一致；严格保持其橄榄棕色皮革立领短打劲装、胸腹部多重皮带交叉束缚绑带、内搭浅色衬衣领口的造型一致。场景严格基于上传的湖畔芦苇滩图（金色芦苇丛在夕阳逆光中大片摇曳，地面散布深色碎石与岩块，湖面在远处泛起细碎波光，天空由青转金形成冷暖交界的过渡色带），不替换、不混入其他场景元素。

2️⃣模块二·全局设定

基础环境与质感：湖畔芦苇滩地，金色芦苇随风大片剧烈翻涌，近景散落深色岩石可作借力、翻跃与遮蔽，地面为干硬沙土混杂枯草与碎石，远处湖面波光粼粼，逆光颗粒感强烈，空气中大量漂浮芦苇绒絮与扬尘，视觉冲击力强。
视觉风格：电影级写实武侠质感，一代宗师式逆光剪影与卧虎藏龙式旷野张力并置，暖金逆光与冷蓝天色形成强烈色温对撞，高对比光影切割身体轮廓，浅景深与深景深交替使用以强化空间纵深与冲击力。
镜头语言：本版本运镜复杂度显著提升——开场对白用中近景固定镜头制造言语张力的静场感；进入打斗后采用多机位快速切换（低角度仰拍出手轮廓、过顶俯冲镖射镜头展现缠斗整体、望远长焦压缩空间制造逼近感、手持轻微震动贴身跟拍配合寸拳节奏、侧向大幅度环绕展现身位互换）；允许使用速度渐变（正常速度骤然推入极短慢镜，再瞬间弹回正常速度）制造打击瞬间的冲击力，全片慢镜/定格次数放宽至2次，每次不超过1秒；切镜频率提升但轴线与几何关系必须保持连续，不得出现方向错乱或位置漂移；收尾采用缓慢拉升的全景镜头收束情绪。
人物造型：男性角色延续角色卡设定，罩肩流苏与银币链饰在剧烈打斗中大幅甩动碰撞出清晰声响，长衫下摆随高强度步法翻卷撕扯；女性角色延续角色卡设定，皮革束带贴身不散但衣领与发丝随身法剧烈甩动，长发在多次翻转闪避中大幅扬起。
表演核心：开场对白简练锋利，一句挑衅、一句应战，语气克制但暗藏杀机；打斗段落要求招招凌厉、连续性强、力量感十足——寸拳、擒摔、反关节、借力翻跌接连爆发，节奏应比常规版本更密集、更具视觉冲击，但每一击仍须有明确发力与受力反馈，杜绝为炫技而炫技的空转动作；整场为纯粹徒手近战，不出现兵器、法术、光效等超现实特效。
台词与音效纪律：全片保留人物同步对白，不使用屏幕字幕；对白仅出现在开场极短两句交锋，打斗全程不安排语言，仅保留急促呼吸声、拳风破空声、布料剧烈摩擦声与身体落地闷响；背景不使用配乐，环境音（狂风声、芦苇剧烈摩擦声、水浪声）随打斗强度增大而增强，收尾处可点缀极简重音强调最后定格。
禁止项：不要屏幕字幕；不要背景音乐喧宾夺主；不要面部或服装穿模变形；不要肢体断裂或穿插错位；不要出现光刃、法术特效或凌空浮空超出人体力学的动作；不要慢镜/定格超过2次或单次超过1秒；不要镜头切换导致空间重置或轴线错乱；不要下跪等仪式性动作；不要镜头静止超过1.5秒（对白固定镜头单镜不超过2秒）。
空间调度：以芦苇丛边界、近景岩石群、湖岸边缘三个空间锚点构建动线——对白后迅速由静转动，从芦苇丛外围爆发式贴近，转入岩石区借力翻跌与反关节缠斗，最终在湖岸边缘完成高潮摔投并定格收束；打斗时长控制在约15秒，运镜强度随节奏逐步攀升再骤然收束。

3️⃣模块三·时间戳戏剧分镜

【0-1.5秒】男性角色立于芦苇丛边缘，逆光轮廓锐利，风卷起衣袍下摆，镜头固定中近景对准他，他冷声开口："还想拦我？"

【1.5-3秒】镜头切至女性角色近景，发丝被风扬起半遮面容，她唇角一沉："试试就知道。"话音未落，她已向前迈出第一步——打斗骤然引爆。

【3-4.5秒】女性角色骤然贴近，右拳直取面门，男性角色侧头堪堪避过，镜头由固定切为手持贴身跟拍，微震感配合出拳节奏，芦苇绒絮在两人之间炸开。

【4.5-6秒】男性角色反手抓其手腕借力回带，女性角色顺势翻转卸力反打一肘，镜头切换至低角度仰拍，捕捉两人交叠手臂与转身轮廓的剪影。

【6-7.5秒】速度渐变慢镜（约0.8秒）：女性角色一记侧踢擦过男性角色肋侧堪堪未中，衣料剧烈鼓起的瞬间被短暂放大，随即镜头速度骤然弹回正常。

【7.5-9秒】男性角色借躲闪之势反手擒住她手臂发力欲摔，女性角色低身卸力翻滚脱出，镜头切换为过顶俯冲镖射镜头，展现二人在地面翻滚缠斗的整体轨迹。

【9-10.5秒】二人几乎同时起身再次贴近，连续三次快速交手（直拳—格挡—反打），镜头做侧向大幅度环绕运镜，轴线保持连续，展现身位持续互换。

【10.5-12秒】女性角色借岩石借力猛然腾身，一记高踢直取男性角色肩侧，男性角色侧身堪堪滑过并顺势抓住她小腿，镜头切至望远长焦压缩镜头，强化逼近感与冲击力。

【12-13秒】男性角色借势用力一带，女性角色借惯性翻身反手扣住他肩颈欲制，二人瞬间贴身角力僵持，镜头急速推进特写二人紧绷的手臂与肌肉线条。

【13-14秒】速度渐变第二次慢镜（约1秒）：男性角色发力将女性角色翻身压制，二人同时向岩石区边缘倾倒失衡，衣袍与发丝在空气中剧烈甩起的瞬间被放大定格，随即镜头速度骤然恢复正常。

【14-16秒】恢复正常速度，二人翻滚跌落至湖岸边缘沙地，扬起大片尘土与水花，镜头随跌落轨迹俯冲跟拍，冲击力拉满。
```

</details>

<a id="image-reference-06"></a>
### 23. Paper-to-UI Launch Reveal

`wan3.0-reference-video` · 9s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-06#image-reference-06)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Five reference frames chart a 9-second product launch where colored paper wipes reveal UI panels and cards.

<table>
<tr><th>Image1</th><th>Image2</th><th>Image3</th><th>Image4</th><th>Image5</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-cd0cb879907c.webp" width="150" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-33722235a46e.webp" width="150" alt="Image2"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-c117c3ecee70.webp" width="150" alt="Image3"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-a1d8808f099c.webp" width="150" alt="Image4"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-9f4f6d246a6f.webp" width="150" alt="Image5"></td><td align="center"><video src="https://github.com/user-attachments/assets/49d984d4-e4dc-4269-89cd-1a984a2bc987" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Generate a 9-second premium product launch motion video, pure white studio shoot, soft natural light, cinematic macro. Style: Google / Apple / Material Design, combining colored paper craft, translucent materials, and UI interfaces, clean and refined.

Storyboard by the five images:
- Image 1 (0–1.48s): centered on a white background, a compact stack of colored paper (white sheets plus translucent blue-green and purple paper), ample white space, with only a gentle breathing float, keeping a restrained opening. @Image1
- Image 2 (1.48–3s): paper is cut open to reveal a UI panel through a paper wipe / mask reveal. The main panel, then cards, then buttons and tags appear one after another (Material ease), with surrounding paper decorations floating. @Image2
- Image 3 (3–4.64s): an angled overhead view with spatial parallax. The UI panel floats above green grid paper, a blue translucent band, purple folded paper, and orange cards, with the camera slowly panning and slightly pressing in. @Image3
- Image 4 (4.64–8.52s): a horizontal card wall. Multiple cards (content / files / tasks) slide in and arrange via card cascade, layout reflow, and soft slide, midway turning to a task-completion scene, while a right-side function area and highlight prompts form. @Image4
- Image 5 (8.52–9s): the final UI settles, with a highlighted tagline, function cards on the right, and colored decorative anchors, freezing with a smooth ease-out. @Image5
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
生成9秒高级产品发布动态视频，纯白棚拍，柔和自然光，电影级微距。风格：Google Apple/Material Design，结合彩色纸张工艺、半透明材质与UI界面，干净精致。

按5张图分镜：
- 图1（0–1.48s）：白底中央，紧凑彩色纸张堆叠（白页+蓝绿紫半透明纸），留白充足，仅呼吸浮动，保持克制开场。 @Image1
- 图2（1.48–3s）：纸张通过paper wipe/mask reveal切出UI面板。主面板→卡片→按钮/标签依次浮现（Material ease），周围纸张装饰漂浮。 @Image2
- 图3（3–4.64s）：斜向俯视，空间视差。UI面板悬浮于绿色网格纸、蓝色透明带、紫色折叠纸、橙色卡片之上，镜头缓慢平移+微压。 @Image3
- 图4（4.64–8.52s）：横向卡片墙，多卡片（内容/文件/任务）按card cascade、layout reflow、soft slide滑入排列，中途转向任务完成场景，右侧功能区和高亮提示形成。 @Image4
- 图5（8.52–9s）：最终UI稳定，高亮标语、右侧功能卡、彩色装饰锚点，smooth ease-out定格。 @Image5
```

</details>

<a id="image-reference-07"></a>
### 24. Lip Gloss Model Try-On

`wan3.0-reference-video` · 15s · 9:16 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-07#image-reference-07)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Using only one lip gloss product image, this 15-second vertical clip shows a model trying the shade.

<table>
<tr><th>Image1</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-8bf69ee0aa41.webp" width="220" alt="Image1"></td><td align="center"><video src="https://github.com/user-attachments/assets/57bcbf92-621b-430e-b34e-8d61555d0595" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Using only the lip gloss product image @Image1, generate a model try-on video: 15 seconds, vertical, highlighting the lip color effect.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
只有唇釉产品图 @Image1 ，生成模特试色视频，15秒，竖屏，突出唇色效果
```

</details>

<a id="image-reference-08"></a>
### 25. Kindness After Closing Time

`wan3.0-reference-video` · 20s · 4:3 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-08#image-reference-08)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

One reference image drives a cel-shaded scene: a burly ramen-shop owner kneels to a stray kitten in the rain.

<table>
<tr><th>Image1</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-b730725ba915.webp" width="220" alt="Image1"></td><td align="center"><video src="https://github.com/user-attachments/assets/c6429fac-78f4-41cb-9cc3-41322e6e6581" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Shot 1: late at night after closing, Image1 carefully wipes the counter with a rag <rag friction sound>. His huge hands, covered in old calluses and fresh wounds, move steadily, and his face shows the fatigue of closing time.
Shot 2: a faint whimper comes through <kitten whimpering sound>. His hands stop, and with a slight frown he opens the door, revealing a skinny stray kitten shivering in the rain at the entrance.
Shot 3: a slow push-in to the kitten's helpless eyes. Image1's tired expression is gradually replaced by something gentle. After a silent standoff of several seconds, the giant man slowly and stiffly crouches down.
Shot 4: close-up on his face. The hard lines of his face loosen, the corners of his mouth break into a clumsy but kind smile, and the muscles around the scar at the corner of his eye relax as well. Cel-animation texture, bold black outlines with hard-edged imagery, with the warm yellow light of the ramen shop contrasting against the cold blue of the rainy back alley.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
镜头1：深夜打烊后， Image1 用抹布仔细擦拭吧台<抹布摩擦声>，一双布满旧茧和新伤的巨手动作沉稳，脸上是打烊后的疲惫。
镜头2：传来一声微弱的呜咽<小猫呜咽声>，他手上动作停下，眉头微皱拉开门，只见门口一只瘦骨嶙峋的流浪小猫在雨中发抖。
镜头3：缓慢推镜到小猫无助的眼神， Image1 疲惫表情逐渐被一种温柔取代，沉默对峙数秒后这个巨汉缓缓僵硬地蹲下身。
镜头4：面部特写，他脸上坚硬的线条松弛下来，嘴角咧开一个笨拙而和善的微笑，眼角伤疤周围的肌肉也跟着舒展。赛璐珞动画质感，粗黑轮廓线硬朗画面，拉面店暖黄灯光与后巷雨夜冷蓝对比调。
```

</details>

<a id="image-reference-09"></a>
### 26. Clay Fox's Apple Journey

`wan3.0-reference-video` · 15s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-09#image-reference-09)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

A clay-textured fox trots through a miniature town, picks up an apple, and munches it at sunset on a wall.

<table>
<tr><th>Image1</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-a7c80a9d6df1.webp" width="220" alt="Image1"></td><td align="center"><video src="https://github.com/user-attachments/assets/256e9d28-5a38-4bc8-8e58-58ca83660f41" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Reference the aesthetic style of image 1. A clay-textured little fox stands at the edge of an autumn forest, ears perked, gazing toward a distant town with smoke rising from its chimneys. It trots down the hillside on short legs and crosses a miniature stone arch bridge, with the stream below flowing slowly, its texture like transparent resin. The little fox runs into the town market and stops at a fruit stall, using a paw to flick a red apple, which rolls onto the ground and spins around a few times. It picks the apple up in its mouth and keeps running, passing a bakery entrance, where smoke from the chimney rises in puffs like cotton wool. Finally the little fox jumps onto a low wall outside the town, sits down, and nibbles the apple facing the setting sun, with orange evening glow covering the entire clay sky. Miniature scene, shallow depth of field.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
参考图片1的美学风格。一只黏土质感的小狐狸站在秋天的森林边缘，竖起耳朵望向远处冒着炊烟的小镇。它迈开短腿小跑下山坡，穿过一座微缩的石拱桥，桥下溪水用透明树脂般的质感缓缓流动。小狐狸跑进小镇集市，在一个水果摊前停下，用爪子拨弄一颗红苹果，苹果滚落到地上骨碌碌转了几圈。它叼起苹果继续跑，经过一家面包店门口，烟囱里飘出的烟雾像棉絮一样一团团升起。最后小狐狸跳上镇外的矮墙，坐下来对着夕阳啃苹果，橙色晚霞铺满整个黏土天空。微缩场景，浅景深。
```

</details>

<a id="image-reference-10"></a>
### 27. Lace Blouse at a Café Door

`wan3.0-reference-video` · 8s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-10#image-reference-10)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Two reference images drive a café-door sequence that shows a lace blouse's details in soft afternoon light.

<table>
<tr><th>Image1</th><th>Image2</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-3504c98cb80c.webp" width="220" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-097f9a601abe.webp" width="220" alt="Image2"></td><td align="center"><video src="https://github.com/user-attachments/assets/7c1c94e1-59f8-4bb3-842d-997b5ce2e04c" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
The girl in image 1 puts on the off-white lace blouse from image 2, paired with a black high-waisted A-line half skirt and pointed short boots. The setting is the front of a European-style retro corner café: wrought-iron tables and chairs, climbing roses, a warm yellow display window, and old brick walls. First, she pushes open the glass door of the café and steps out, with her whole body in frame to show the overall outfit silhouette, while the three tiers of ruffled sleeve cuffs flutter layer by layer with her arm movements. Then she leans against the back of a wrought-iron chair and stands with a slight side turn, one hand gently raised to her collarbone. The camera pushes in to show the lace openwork pattern on her chest and the delicate detail of the pearl buttons lined along the placket. Next, she smooths her hair and turns to a side profile, while the soft sheen of the satin fabric flows with the curve of her body. Finally, she picks up a coffee cup from the table and takes a small sip, the ruffled cuffs spreading out in layers beside the rim of the cup, and the frame freezes to close. Soft natural afternoon light, with a languid, romantic French mood.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
图片1的女孩穿上图片2的米白色蕾丝衬衫，下身搭配黑色高腰A字半裙和尖头短靴。场景为欧式复古街角咖啡馆门前——铁艺桌椅、爬藤玫瑰、暖黄橱窗、旧砖墙面。先从咖啡馆玻璃门推门而出，全身入画展示整体穿搭轮廓，三层荷叶边袖口随手臂动作层叠飘动。然后靠在铁艺椅背旁微侧站立，一手轻抬至锁骨处，镜头推近展示胸前蕾丝镂空花纹，珍珠扣沿门襟排列的精致细节。接着她拢了拢发丝转身侧面，缎面面料的柔和光泽随身体弧度流动。最后端起桌上咖啡杯轻抿，袖口荷叶边在杯沿旁层层散开，定格收尾。午后柔和自然光，法式慵懒浪漫调性。
```

</details>

<a id="image-reference-11"></a>
### 28. Door to a Magic Alley

`wan3.0-reference-video` · 15s · 9:16 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-11#image-reference-11)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Three continuous segments: a child opens a door in a modern flat and steps into a damp Gothic alley, with no hard cuts.

<table>
<tr><th>Image1</th><th>Image2</th><th>Image3</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-a3d22ddf4ffa.webp" width="220" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-38a1b0a20f66.webp" width="220" alt="Image2"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-1f4c5daedf8d.webp" width="220" alt="Image3"></td><td align="center"><video src="https://github.com/user-attachments/assets/3dd88381-a667-4519-a557-7da4302c79cc" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Segment 1 [0–5 seconds]: a continuous, photorealistic cinematic shot. Inside the entryway of the modern apartment in image 2, the child in image 1 stands at a three-quarter angle in the center of the frame, smiling at the camera and making a natural beckoning gesture, inviting the audience to follow, with a faint dimple appearing on his right cheek. He then lowers his arm and turns smoothly to the left and back <two soft footsteps on the wooden floor>, walking away from the camera toward the wood-grain front door ahead. He reaches out with his left hand, grips the black electronic door handle and turns it <a crisp mechanical unlocking click>, and slowly pulls the door open inward. In the first half of this segment the camera remains completely still; the character's appearance and clothing stay consistent, the movements are natural and fluid, and the door's structure and material look real. Soft interior overhead light evenly illuminates the beige walls and light-brown wooden floor, with no hard cuts or abrupt scene changes.

Segment 2 [5–10 seconds]: seamlessly continuing from the last frame of the previous segment, the character, clothing, apartment entryway, and camera position stay fully consistent. The character opens the door fully, and a warm yellow light carrying a damp air flows in from outside. Beyond the door is the magical alley world of image 3: a wet cobblestone narrow lane stretching into depth, flanked by towering Gothic spired buildings, with wrought-iron signboards projecting from the walls, warm orange gas lanterns lighting every shop window, a distant spire faintly visible through grey-blue dusky clouds, and white smoke rising from chimneys on the rooftops <faint distant bells>. The composition, camera angle, spatial distance, and the relationship between the two spatial layers of the entryway and the street remain consistent, and everything outside the door belongs to the magical alley world. He pauses briefly at the threshold, looks back over his left shoulder toward the camera again, and his smile changes from relaxed to curious excitement. As the lens crosses the threshold, the light and mood shift from the bright warm-wood tones of the interior to a mix of warm orange lantern light and grey-blue dusk in the damp alley, but the space and lighting remain physically natural and continuous <a low cello melody slowly rises, interspersed with harp plucks>. No hard cuts or abrupt scene changes.

Segment 3 [10–15 seconds]: seamlessly continuing from the last frame of the previous segment, the camera has now passed through the doorframe into the magical alley world. He turns and steps onto the wet cobblestone road <the crisp echo of leather shoes on wet stone slabs>, and the camera follows smoothly from behind on a steady tracking path, moving through the doorway deeper into the narrow lane. His figure walks slowly between the towering buildings on both sides; his grey sweater and dark long trousers are alternately lit by the warm light from the shop windows on either side, the puddles on the road reflect the overhead lanterns and building silhouettes, and the distant spire grows clearer. Finally the camera settles on a deep wide shot, placing his back, walking through the brightly lit magical narrow alley, at the exact center between the wet stone road and the Gothic spire <the cello and harp interweave to reach a calm and mysterious peak>. No hard cuts or abrupt scene changes throughout. The texture transitions seamlessly from realism to dark fantasy; high-definition, sharp imagery; the low-saturation warm-wood tones of the entryway gradually shift to a high-contrast, darker palette where warm orange street lighting meets grey-blue dusk.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
分段1[0-5秒]：一个连续的、照片级写实的电影镜头。在 图2的现代公寓玄关内， 图1的儿童以斜侧身位站在画面中央，面对镜头微笑并做出自然的招手动作，示意观众跟上，右脸颊浮现浅浅的酒窝。随后他放下手臂，身体流畅地向左后方转身<脚步踩在木地板上的两声轻响>，他背对镜头走向前方的木纹入户门，伸出左手握住黑色电子锁把手转动<咔哒机械解锁声>，缓慢地将门向内打开。在这段前半部分摄影机保持完全静止，角色的外貌和服装保持一致，动作自然流畅，门的结构和材质呈现真实质感。柔和的室内顶光均匀照亮米色墙壁和浅棕色木地板，无硬切或突兀的场景转换。

分段2[5-10秒]：从上一分段的最后一帧无缝衔接，角色、服装、公寓玄关和机位保持完全一致。角色将门完全打开，一股暖黄色的、夹带着潮湿气息的光线从门外涌入。门外是 图3 的魔法街巷世界——一条湿漉漉的鹅卵石窄巷向纵深延伸，两侧是高耸的哥特式尖顶建筑，锻铁招牌从墙面伸出，暖橙色的煤气灯笼照亮每一扇橱窗，远处一座尖塔在灰蓝色暮云中若隐若现，屋顶烟囱冒着白烟<远处隐约的钟声>。构图设计、摄影机角度、空间距离以及玄关与街巷两个空间层次之间的关系保持一致，门外的所有环境都是魔法街巷世界。他在门口稍作停顿，回头越过左肩再次看向镜头，脸上的微笑从轻松转为带着好奇的兴奋。当镜头越过门槛时光线和氛围从室内明亮暖木色调变化为街巷湿冷的暖橙灯光与灰蓝暮色交织，但空间和照明在物理上保持自然且连续（低沉的大提琴旋律缓缓响起，间杂竖琴拨弦）。无硬切或突兀的场景转换。

分段3[10-15秒]：从上一分段的最后一帧无缝衔接，镜头此刻已穿过门框进入魔法街巷世界。他转身迈步踏上湿漉漉的鹅卵石路面<皮鞋踩在湿石板上的清脆回响>，镜头以稳定的跟拍轨迹从身后平滑跟随，持续穿过门洞进入窄巷深处。他的身影在两侧高耸建筑之间缓步前行，他的灰色毛衣和深色长裤被两侧橱窗透出的暖光交替照亮，路面积水倒映着头顶灯笼和建筑轮廓，远处尖塔越来越清晰。最终镜头落幅于一个纵深全景画面，将他行走在灯火通明的魔法窄巷中的背影置于湿漉石路与哥特尖塔的正中心（大提琴与竖琴在此交织达到沉稳而神秘的高点）。全程无硬切或突兀的场景转换。写实与暗黑奇幻无缝过渡质感，高清锐利画面，玄关暖木低饱和色调渐变为街巷暖橙灯光与灰蓝暮色交织的高对比暗调。
```

</details>

<a id="image-reference-12"></a>
### 29. Three-Hero Game Trailer

`wan3.0-reference-video` · 15s · 9:16 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-12#image-reference-12)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Three character art references drive a 15-second game ad trailer that shows skills in three segments, ending with merged particles.

<table>
<tr><th>Image1</th><th>Image2</th><th>Image3</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-37458c83ec9c.webp" width="220" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-c16d7463d3cd.webp" width="220" alt="Image2"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-56f3fd1be628.webp" width="220" alt="Image3"></td><td align="center"><video src="https://github.com/user-attachments/assets/aa04aa32-7b74-4ce0-92d1-785b115a7adb" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
【Video type】 Game user-acquisition character PV showcase video
【Duration】 15 seconds
【Reference material】 three operator character art images (Scarlet Fox dual-gunner Feiyou @Image1, Human Alchemist Scholar Ziluo @Image3, Tiger-striped Beastfolk Mage Tingyue @Image2)
【Shot structure】
Segment 1 (0–3 seconds): the three characters enter one after another in close-ups, emerging from the shadows with their signature elemental particles circling them (Feiyou — fox-fire illusion flame @Image1; Ziluo — alchemical essence @Image3; Tingyue — thunder-carving arts @Image2). The camera slowly pushes in to focus on the faces, with expressions showing each character's traits (Feiyou @Image1 nimble backward glance; Ziluo @Image3 intellectual smile; Tingyue @Image2 steady, composed gaze).
Segment 2 (3–10 seconds): skill showcase with dynamic shots, rapid transitions between them.
● Feiyou: sideways low crouch, firing a flintlock long gun in rapid succession with both hands; mint-gold fox-fire bursts from the muzzle and condenses into three fox-shadow clones that dart in to attack, with gunshot sound effects and fox-fire particle VFX.
● Ziluo: one hand raising a brass balance high, violet essence fluid streaming from her fingertips, condensing into flowing replica bodies that orbit around her, with essence-surge sound effects and violet translucent light particle VFX.
● Tingyue: tilting a magic staff, drawing a golden eagle to take flight; a dark green bronze-toned thunderbolt erupts from the staff tip, sweeping across to daunt the enemy, with thunder sound effects and lightning particle VFX.
The camera sways following the trajectories of the elements; the character movements and poses are dynamically shown, with expressions focused on a battle state.
Segment 3 (10–15 seconds): a group shot of the three standing side by side, slowly pulling in from a wide shot to a medium shot; their signature elements converge behind them (a blended particle cloud of fox-fire, essence, and thunder-carving), with the color gradient shifting (mint-gold, violet, dark green bronze), each showing their character's traits in expression, and their names flashing in turn.
【Camera control】
● Close-up: facial close-up of the characters, with expression detail synced to lip movement
● Medium shot: upper body of the characters, with movement and effect release
● Wide shot: group shot of the three, showing team momentum
● Dynamic shot: fast movement during skill release, following the trajectory of the elements
● Transitions: darkness fading in, element transitions (fox-fire → essence → thunder-carving), quick cuts, slow-motion zoom-in
【Action and effects】
● Feiyou: dual-gun volleys summoning fox-fire phantoms, mint-gold fox-fire particles circling her, the aura of an agile hunter
● Ziluo: controlling the balance and essence, violet liquid-light particles, the aura of an alchemical scholar
● Tingyue: golden eagle taking flight and thunder sweeping, dark green bronze lightning particles, the aura of a grand master of arts
● Converging effect: the three elements' mixed particle cloud, with the color gradient blending
【Expression and lip sync】
● Feiyou: nimble backward glance, slightly sharp, eyes light and certain, with the line "No one escapes beneath the trigger" lip-synced
● Ziluo: intellectual smile, slightly mysterious, eyes warm and calm, with the line "All things are equal in value, including fate" lip-synced
● Tingyue: steady gaze, slightly dignified, eyes sharp as an eagle's, with the line "Wherever the hawk goes, there is thunder" lip-synced
【Voice and sound effects】
● Feiyou's lines: a clear, cool male voice with a slightly carefree, roguish edge, speaking a bit fast at a moderate pitch
● Ziluo's lines: a gentle, intellectual female voice with a slight mystery, speaking slowly at a moderate pitch
● Tingyue's lines: a dignified, solemn male voice with a slightly cold edge, moderate pace, slightly low pitch
● Sound effects: gunshots + fox-fire bursting + essence surging + thunder sweeping + golden eagle wings + mixed particle explosion
● BGM: a mix of epic orchestra and electronic sound effects, with rhythm synced to shot changes, skill releases, and line delivery
【Visual style】
● Color: dark tones with high contrast; Feiyou mint-gold, Ziluo violet, Tingyue dark green bronze
● Particle effects: fox-fire particles, essence particles, thunder-carving particles, converging and merging
● UI elements: game logo emerging, character names flashing, skill names labeled
● Background: from shadowy background → battle scene → high-altitude thunder-cloud background, with a gradient transition
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
【视频类型】游戏买量角色PV展示视频
【视频时长】15秒
【参考素材】三张干员角色立绘图（赤狐双枪枪手·绯狩 @Image1 、人类炼金学者·紫珞 @Image3 、虎纹兽人法师·霆岳 @Image2 ）
【镜头结构】
第1段（0-3秒）：三人依次登场特写镜头，从暗影中显现，专属元素粒子环绕（绯狩-狐火幻焰 @Image1 、紫珞-炼金精华 @Image3 、霆岳-雷雕术法 @Image2 ），镜头缓缓推进聚焦面部，表情展现角色特质（绯狩 @Image1 机敏回眸、紫珞 @Image3 知性微笑、霆岳 @Image2 沉稳凝视）
第2段（3-10秒）：技能展示动态镜头，快速转场切换
● 绯狩：侧身低伏、双手燧发长枪连射，薄荷金色狐火自枪口迸发凝成三道狐影分身穿梭突袭，枪鸣音效+狐火粒子特效
● 紫珞：单手高举黄铜天平、指尖涌出紫罗兰色精华液流，凝成流形复制体环绕，精华涌动音效+紫光透明粒子特效
● 霆岳：斜举魔法长杖引金雕振翅腾空，墨绿古铜色雷霆自杖端爆发席卷震慑敌方，雷鸣音效+雷光粒子特效
镜头跟随元素轨迹摇动，角色动作姿势动态展现，表情专注战斗状态
第3段（10-15秒）：三人并肩站立群像镜头，从全景缓慢拉近至中景，三人专属元素在身后交汇融合（狐火+精华+雷雕混合粒子云），色调渐变（薄荷金+紫罗兰+墨绿古铜），三人各自展现角色特质表情，三人名称依次闪现
【镜头控制】
● 特写镜头：角色面部特写，表情细节与口型同步
● 中景镜头：角色上半身，动作与特效释放
● 全景镜头：三人群像，团队气势展现
● 动态镜头：技能释放快速移动，跟随元素轨迹
● 转场：暗影渐显、元素过渡（狐火→精华→雷雕）、快速切换、慢镜头拉近
【动作与特效】
● 绯狩：双枪连射召唤狐火幻影，薄荷金色狐火粒子环绕，敏捷猎手气场
● 紫珞：天平与精华操控，紫罗兰色液光粒子，炼金学者气场
● 霆岳：金雕腾空、雷霆席卷，墨绿古铜色雷光粒子，术法宗师气场
● 交汇特效：三人元素混合粒子云，色调渐变融合
【表情与口型】
● 绯狩：机敏回眸，略带锋锐，眼神轻佻而笃定，台词"扳机之下，无人能逃"口型同步
● 紫珞：知性微笑，略带神秘，眼神亲切沉静，台词"万物皆可等价，包括命运"口型同步
● 霆岳：沉稳凝视，略带威严，眼神锐利如鹰，台词"苍鹰所至，即是雷霆"口型同步
【语音与音效】
● 绯狩台词：男声清朗冷冽，略带洒脱痞气，语速偏快音调适中
● 紫珞台词：女声温柔知性，略带神秘，语速舒缓音调适中
● 霆岳台词：男声威严庄重，略带冷峻，语速适中音调偏低
● 音效：枪鸣+狐火迸发+精华涌动+雷霆席卷+金雕振翅+混合粒子爆发
● BGM：史诗交响+电子音效混合，节奏与镜头切换/技能释放/台词发音同步
【视觉风格】
● 色调：暗色调+高对比，绯狩薄荷金、紫珞紫罗兰、霆岳墨绿古铜
● 粒子特效：狐火粒子、精华粒子、雷雕粒子，交汇融合
● UI元素：游戏Logo浮现，角色名称闪现，技能名称标注
● 背景：暗影背景→战斗场景→高空雷云背景渐变
```

</details>

<a id="image-reference-13"></a>
### 30. Two-Model Hard-Cut Fashion Film

`wan3.0-reference-video` · 15s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-13#image-reference-13)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Two models cross and stand back to back in hard cuts within a white space, with slow motion and a slow zoom-out finale.

<table>
<tr><th>Image1</th><th>Image2</th><th>Image3</th><th>Image4</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-6c3f33aa764c.webp" width="150" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-5b0402e51935.webp" width="150" alt="Image2"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-971c0543d377.webp" width="150" alt="Image3"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-4c191e163310.webp" width="150" alt="Image4"></td><td align="center"><video src="https://github.com/user-attachments/assets/d970e973-e61a-41dd-9469-393feee73209" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
A cinematic dual-heroine fashion feature with an extremely fast rhythm, pure hard-cut (jump cut) editing logic, shot on an ARRI Alexa 65 with Panavision anamorphic widescreen lenses, with the texture of Kodak Vision3 500T film, 8K resolution, photorealistic, with no text. The facial features of the people are fully locked to Girl A @Image1 and Girl B @Image2.

[0–3 seconds: rapid entrance and contrast] (hard cut) A pure white minimalist space, cut by strong side light into sharp shadows. Left screen / left side: Girl A wears a black deconstructed leather suit, her eyes cold and striking under the cold light, quickly turning her head to look straight into the lens. Right screen / right side: Girl B wears a flowing champagne-gold silk gown, her eyes languid under the warm light, quickly turning her head to look straight into the lens. Real film grain.

[3–6 seconds: extreme material close-ups] (hard cut) Extreme macro close-ups. Girl A's reference garment @Image3: cold light falls on the sharp creases of the black leather and the metal accessories, presenting a chilly, premium sheen. Girl B's reference garment @Image4: warm light outlines the line of her collarbone, the silk fabric flows like water ripples, and her skin shows a hyper-real translucent dewy texture with fine down visible.

[6–9 seconds: tension and interweaving (high-speed photography)] (hard cut) The two walk toward each other in the pure white space and pass by one another. High-speed photography (1000fps slow motion). The toughness of the black leather and the softness of the champagne silk collide intensely at the moment they cross, with the skirt and hair flying through the air. In the zero-point-one seconds of their crossing, their eyes meet sharply.

[9–12 seconds: back-to-back pressure] (hard cut) The two stand back to back. Strong side-backlight (rim light) outlines both faces and the golden edges of their hair at the same time. They quickly turn their heads together to look straight into the lens. The expressions are intensely pressing, professional, and full of the confident aura of top-level supermodels.

[12–15 seconds: relaxation and freeze] (hard cut) The two stand side by side, tilting their heads slightly toward each other, and smile with a magnetic, relaxed, confident smile. The camera slowly zooms out (slow zoom out) to reveal the perfect proportions of the two in a grand space of light and shadow, and the frame fades to darkness within a premium halo of light.

Camera: fast handheld, rapid push-ins, high-speed slow-motion photography, pure hard cuts, no flashy visual effects.
Color: a high-contrast black, white, and grey base, accented with cold metallic sheen and warm champagne-gold tones, with cinematic color grading.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
电影级双女主时尚大片，极快节奏，纯硬切（Jump Cut）剪辑逻辑，阿莱Alexa 65与Panavision变形宽银幕镜头拍摄，柯达Vision3 500T胶片质感，8k分辨率，照片级真实，无文字。人物面部特征完全锁定女生A @Image1 和 女生B@ @Image2 。

[0-3秒：极速登场与反差] （硬切）纯白极简空间，被强烈的侧光切割出锐利的阴影。左屏/左侧：女生A穿着黑色解构主义皮革西装，冷光下眼神冷艳，快速转头直视镜头。右屏/右侧：女生B穿着香槟金流动真丝长裙，暖光下眼神慵懒，快速转头直视镜头。真实的胶片颗粒感。

[3-6秒：材质极致特写] （硬切）极近微距特写。女生A参考服饰 @Image3 ：冷光打在黑色皮革的锋利折痕和金属配饰上，呈现冷冽的高级光泽。女生B参考服饰 @Image4 ：暖光勾勒出她锁骨的线条，真丝面料如水波般流动，皮肤呈现超写实的通透水光肌质感，可见细微绒毛。

[6-9秒：张力交错（高速摄影）] （硬切）两人在纯白空间中迎面走来，擦肩而过。高速摄影（1000fps慢动作）。黑色皮革的硬朗与香槟真丝的柔软在交错瞬间剧烈碰撞，裙摆与发丝在空中飞扬。两人在交错的零点一秒内，眼神锐利地对视。

[9-12秒：背靠背的压迫感] （硬切）两人背靠背站立。强烈的侧逆光（Rim light）同时勾勒出两人的面部轮廓和发丝金边。她们同时快速转头，直视镜头。表情极具压迫感、专业且充满顶级超模的自信气场。

[12-15秒：松弛与定格] （硬切）两人并肩站立，微微侧头相视，露出极具感染力的、松弛而自信的微笑。镜头缓慢向后拉远（Slow zoom out），展现两人在宏大光影空间中的完美比例，画面在高级的光晕中渐暗。

运镜：快速手持，极速推镜头，高速摄影慢动作，纯粹的硬切，无花哨视觉特效。
色彩：高对比度的黑白灰基调，点缀冷冽的金属光泽与温暖的香槟金色，电影级色彩分级。
```

</details>

<a id="image-reference-14"></a>
### 31. Neon City Orb Chase

`wan3.0-reference-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-14#image-reference-14)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Two martial artists fight over one glowing orb through streets, crowds, and traffic, ending with a bus-blocked escape.

<table>
<tr><th>Image1</th><th>Image2</th><th>Image3</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-2ef9199591ce.webp" width="220" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-061d7b69b5fa.webp" width="220" alt="Image2"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-0b088e2a369f.webp" width="220" alt="Image3"></td><td align="center"><video src="https://github.com/user-attachments/assets/761bf735-5038-4b90-9196-4024b93602d5" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Generate a roughly 30-second, 16:9 landscape, high-aesthetic urban MG chase short. Image 1 @Image1 serves as the reference for the city space, neon atmosphere, lane structure, and the overall visual texture; image 2 @Image2 is the only appearance reference for the male character; image 3 @Image3 is the only appearance reference for the female character. Strictly keep both characters' faces, hairstyles, body shapes, costume structures, color schemes, and recognizability stable and unified.

【Overall style】
High-end motion graphics dynamic illustration style, blending flat MG graphic language, refined 2.5D spatial layering, and restrained three-dimensional volume. The overall look is not a realistic live-action film, not a childish cartoon, and not a dirty, heavy industrial cyberpunk. The mood should be flashy, cool, beautiful, tense, and eye-catching, like a promotional short for a high-octane urban chase in action cinema. The camera extensively uses handheld tracking, fast pans, snap zooms, low-angle ground-hugging shots, backward-moving shots in front of the subjects, whip pans, and occasionally wide drone shots, creating a strong sense of chase pressure.

【Character action logic】
The woman's strengths are lightness, speed, quick reactions, and skill at using the environment and changing lanes. The man's strengths are power, anticipation, a sense of pressure, and skill at interception and close control. Both are martial arts masters, so the struggle is not random tearing, but revolves around the orb in “grab, block, deflect force, switch hands, use leverage, turn, dodge, and counter.” The woman often uses turning to shed force, changing lines to slip away, and using obstacles to open up distance; the man often uses early positioning, grabbing the wrist to intercept the ball, using his body to seal off routes, and suppressing once he closes in.

【The orb】
The orb can be held in one hand, with a white core and a soft halo of violet, pink, and blue, and it is the only object of contention throughout. The orb must realistically light up the hands, the edges of the faces, the clothing, and the surrounding environment. There is always only one orb; its size stays stable, and it does not duplicate, vanish, or deform. When it moves, it leaves only short, clean light trails.

【0.0–4.0 seconds | Urban sweep and the woman's entrance】
The shot opens with a high-speed sweep over the city night from high in the air, passing over tall buildings, neon signs, and road lights, then diving down a main avenue into the district, crossing the traffic flow before rapidly dropping low to the street edge. When the camera stops abruptly, the woman rushes in from the side, clutching the orb in her hand. First a quick sequence of close-ups: footsteps, the hand gripping the orb, a glance back, and her upper body thrusting forward. She is not running leisurely but clearly fleeing: while running she quickly watches both the route behind and the route ahead, showing that she knows someone is chasing her.

【4.0–8.0 seconds | The man intercepts, first close struggle】
As the woman enters a narrow passage at a street corner, the man cuts in early from another route, showing that he is not chasing blindly but anticipating an intercept. Upon seeing the man, the woman does not stop immediately but tries to slant past diagonally. His first step is to reach out and grab her ball-holding wrist, his target clearly only the orb. She instantly pulls her arm in to protect the ball, while using the force of the grab to turn her body around to the outside of his grabbing hand, forming the first deflection of force. He immediately switches to his other hand to cut off the ball's route, and seals her path with his shoulder. She drops her center of gravity, slides out from beneath his arm at a low crouch, and as she leaves his position she lightly blocks his chest with her forearm, creating a half-step gap. He catches up again, briefly touching the ball without fully securing it. Here the camera hugs both figures, using close handheld shots, rapid zooms, and small orbiting moves, always circling the orb and the movement of the hands. Finally the woman breaks away from him with a quick turn and continues to sprint out.

【8.0–13.0 seconds | Into the crowd, the woman counters using the people】
The woman plunges into a dense crowd, not running randomly but actively choosing a complex environment, because she is more agile than the man. She first slips sideways between two pedestrians, then quickly changes direction using a roadside stall and railings, making it hard for him to close in along a straight line. The man does not slow down; he pushes straight through the crowd in pursuit, occasionally bumping people aside to create pressure. The camera here mainly uses wide, handheld, close-in chase shots; passersby may briefly block the frame, creating a real sense of chaos. At one point in the crowd the man catches the back hem of the woman's jacket, but she does not turn back and tug; she half-turns with the pull, redirecting the force of the jacket to the side, while simultaneously pressing his forearm open with her elbow, then turns back and slips past his side. The two make close contact a second time in the crowd: the man hooks her forearm with one hand while going straight for the orb with the other; she lifts the ball-holding hand to dodge, and with the other hand hooks his wrist, rotating her body in the opposite direction, using momentum to pull him off balance by half a step. In this instant she squeezes out from his side and breaks free again.

【13.0–16.5 seconds | Into traffic, speeding on bicycles】
After emerging from the crowd, the woman reaches the edge of the main avenue, judges that continuing on foot will get her caught, and immediately upgrades her mode of transport. She grabs the handlebar of a roadside bicycle and, using the momentum of her forward dash, swings onto it, riding almost without a pause. The man lags half a beat behind but immediately grabs another roadside bicycle to give chase. Here a brief wide shot establishes the space: the tall city buildings, the main avenue, the traffic flow, and both of their routes. Then the shot immediately cuts back to a low angle and enters a high-speed bicycle chase.

【16.5–24.0 seconds | Traffic chase and the third struggle】
The woman's route on the bike is more flexible: she changes lanes along the edges of cars, squeezes in beside vehicles, and cuts diagonally, using gaps in traffic to widen the distance. The man's route is more direct and fierce, aiming to keep shortening the straight-line distance. The camera alternates among ground-level tracking, backward-moving shots in front of the subjects, fast side tracking, and brief high-angle shots. The traffic must respond realistically to the chase: as the two pass the fronts of cars, the vehicles ahead brake suddenly, lights flash, horns blare, and they swerve slightly, creating a sense of danger. The first time the man reaches side-by-side on the bikes and reaches out to grab the orb, the woman does not rush to withdraw; instead she deliberately keeps the orb a half-beat out to the side, luring his body to lean out further. Once his center of gravity shifts, she suddenly squeezes into a lane change, and he grabs empty air. On the second approach, the man's route is smarter: he uses a slowing car to block the woman's escape direction, then closes in from the side and rear, almost catching her ball-holding wrist. This time she does not resist head-on; she quickly switches the orb to her other hand while using the bicycle handlebar to make a half-turn, sliding away from his hand. The two almost pass shoulder to shoulder, and the camera must convey strong speed and a sense of danger.

【24.0–27.5 seconds | The last squeeze and the woman's escape】
The intersection ahead is more complicated. The man uses straight-line speed to close in again, nearly pressing onto the woman's shoulder from behind. At this moment the woman sees a large bus crossing sideways and a row of cars braking suddenly, and instantly judges this to be the chance to escape. She first deliberately keeps her original line so that the man keeps locking onto her; then, just as he gets close, she suddenly squeezes out to the side of a braking car and cuts in, passing through the narrow gap between the car's front and the bus. The man reacts slightly slower and, forced by the angle formed by the car and the bus, must slow down and detour. The camera shakes quickly and is fully blocked by the bus body, creating a natural transition.

【27.5–30.0 seconds | Ending】
After the bus passes and blocks the view, the man bursts out, only to find the woman has already opened up the distance. At a distant neon street corner there is only a bright dot of a rapidly moving orb. The camera rushes toward the distance, and the woman briefly looks back in the deeper neon district, with a touch of triumph and ease, then rides on with the orb. Finally the camera slowly rises and pulls back to show the bustling night city, the continuous flow of traffic, and the light points fading into the distance, as the woman successfully escapes.

【Camera requirements】
70% of the shots carry a handheld feel; do not overly stabilize. The close-quarters struggle segments are mainly handheld, with rapid pushes and pulls and small orbits; the crowd chase segments strengthen the sense of occlusion and breath; the traffic segments emphasize low angles, head-on shots, rapid zooms, and the atmosphere of sudden braking; wide establishing shots are used only to set space and rhythm. The camera always serves the orb's possession, the distance between the two, and the direction of the chase, without meaningless flashy spins.

【Negative constraints】
No smooth commercial camera moves, no constant side tracking, no slow motion, no simple tug-of-war style grabbing of the ball, no characters running around without logic, no childish cartoon look, no realistic live-action style, no war-police weapons, no face-changing of the characters, no confused spatial layout, no vehicle clipping, no orb disappearing, duplicating, or deforming, no cheap cyberpunk.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
生成一支约30秒、16:9横版的高审美都市MG追逐短片。图1 @Image1 作为城市空间、霓虹氛围、车道结构和整体视觉质感参考；图2 @Image2 作为男性角色唯一形象参考；图3 @Image3 作为女性角色唯一形象参考。严格保持两人的脸、发型、体型、服装结构、配色和识别度稳定统一。

【整体风格】
高端motion graphics动态插画风格，融合扁平MG图形语言、精致2.5D空间层次和克制三维体积感。整体不是写实真人电影，不是低幼卡通，也不是脏乱重工业赛博朋克。气质要炫技、酷、美、紧张、抓眼，像动作电影级都市追逐宣传短片。镜头大量使用手持跟拍、快速摇镜、snap zoom、低机位贴地、前方倒退、whip pan、偶尔无人机大全景，形成强烈追逐压迫感。

【角色动作逻辑】
女子的优势是轻、快、反应敏捷、擅长借环境和变线；男子的优势是力量、预判、压迫感、擅长截击和近身控制。两人都是武术高手，所以争夺不是胡乱撕扯，而是围绕光球展开的“抓、挡、卸力、换手、借力、转身、闪避、反制”。女子常用转身卸力、变线脱身、借障碍拉开距离；男子常用提前卡位、抓腕截球、用身体封路线、逼近后压制。

【光球】
光球一手可握，白色核心，带紫粉蓝柔和光晕，是全片唯一争夺目标。光球要真实照亮手部、脸部边缘、衣服和周围环境。它始终只有一颗，大小稳定，不复制、不消失、不变形，运动时只有短促干净的光轨。

【0.0-4.0秒｜城市穿梭与女子登场】
镜头从高空城市夜景高速穿梭开始，掠过高楼、霓虹招牌和道路灯光，再沿主干道俯冲进入街区，越过车流后急速压低到街边。镜头急停时，女子从侧面冲入，手中紧握光球。先给一组快速近景：脚步、握球的手、回头的眼神、上半身前冲姿态。女子不是悠闲奔跑，而是明显在逃：她边跑边快速观察后方和前方路线，说明她知道有人在追。

【4.0-8.0秒｜男子截击，第一次近身争夺】
女子冲入街角狭窄通道时，男子从另一条路线提前切入，说明他不是盲追，而是在预判拦截。女子看到男子后不立即停下，而是试图斜切绕开。男子第一步先伸手抓女子持球手腕，目标明确只冲光球。女子立刻收臂护球，同时借被抓的力量顺势转身，把身体绕到男子抓手外侧，形成第一次卸力。男子马上换另一只手去截球路线，并用肩膀封住她的去路。女子下沉重心，低身从男子手臂下方滑出，临出身位时用前臂轻挡男子胸口制造半步空隙。男子再次追上，短暂碰到球，但没有完全拿稳。这里镜头要紧贴两人，采用手持近拍、快速变焦和小幅环绕，始终围着光球和手部动作走。最后女子用一个快速转身摆脱男子，继续冲出。

【8.0-13.0秒｜冲入人流，女子借人群反制】
女子冲入人流密集区，不是随机跑，而是主动选择复杂环境，因为她比男子更灵活。她先从两名行人中间侧身穿过，再借路边摊位和栏杆快速变向，让男子难以直线逼近。男子不减速，直接穿人群追压，偶尔撞开肩膀制造压迫感。镜头此时以广角手持贴身追拍为主，画面可被行人短暂遮挡，制造真实混乱感。男子在人群中一度抓到女子外套后摆，女子不回头硬拽，而是顺势半转身，把外套拉力引到侧方，同时反手用手肘压开男子前臂，再回身从男子身侧抹过。两人在人群中第二次近身接触：男子一手扣住女子前臂，另一手直取光球；女子用持球手上抬避开，另一手扣住男子手腕，身体向反方向旋转，借惯性把男子带偏半步。这个瞬间女子从男子身侧挤出，再次脱身。

【13.0-16.5秒｜进入车流，骑车提速】
女子冲出人群后进入主干道边缘，她判断继续徒步会被男子追上，所以立即升级交通方式。她顺手抓起路边自行车的车把，借前冲惯性直接跨上车，几乎不停顿就开始骑行。男子晚半拍冲出，也立刻抢起另一辆路边自行车追击。这里用一个短暂大全景交代空间：城市高楼、主干道、车流和两人路线。随后立刻切回低机位，进入高速骑车追逐。

【16.5-24.0秒｜车流追逐与第三次争夺】
女子骑行路线更灵活，她贴着汽车边缘变线、压车、斜切，利用车流缝隙拉开距离；男子路线更直接更凶，目标是不断缩短直线距离。镜头交替使用贴地跟拍、前方倒退、侧面高速平移和短暂俯拍。车流需要对追逐产生真实反应：两人擦过车头时，前方车辆急刹、灯光亮起、鸣笛、轻微避让，形成危险感。男子第一次在骑车段逼到并肩，伸手去抓球，女子不急着收手，而是故意把球保持在外侧半拍，引导男子身体进一步探出；等男子重心偏移后，女子突然压车变线，让男子抓空。第二次逼近时，男子路线更聪明，他借一辆减速汽车挡住女子外逃方向，再从侧后逼近，几乎抓住女子持球手腕。女子这次不硬扛，而是把球迅速换到另一只手，同时身体借车把做一个半转位移，从男子手边滑开。两辆车几乎擦肩，镜头要有强烈速度和危险感。

【24.0-27.5秒｜最后一次压迫与女子脱身】
前方路口车流更复杂。男子利用直线速度再度逼近，几乎要从后侧压上女子肩位。女子这时看到一辆横向经过的大型公交车和一排急停车辆，瞬间判断这是脱身机会。她先故意保持原线路让男子继续锁定自己，等到男子贴近时，女子突然压车向一辆急刹汽车外侧切入，从汽车车头和公交车之间的狭小空间穿过。男子反应稍慢，被汽车和公交车形成的夹角迫使减速绕行。镜头快速摇动并被公交车车身完全遮挡，形成自然转场。

【27.5-30.0秒｜收尾】
公交车遮挡过去后，男子冲出，却发现女子已经拉开距离。远处霓虹街角只剩一颗快速移动的光球亮点。镜头快速推向远处，女子在更深的霓虹街区短暂回头，带一点得意和轻松的神情，随即带球继续骑远。最后镜头缓缓升高拉远，展示繁华夜城、持续车流和远处逐渐消失的光点，女子成功逃脱。

【运镜要求】
全片70%镜头带手持感，不要过度稳定。近身争夺段以手持、快速推拉和小幅环绕为主；人群追逐段加强遮挡感和呼吸感；车流段强调低机位、对冲、快速变焦和急刹氛围；大全景只用于建立空间与节奏呼吸。镜头始终服务光球归属、双方距离和追逐方向，不做无意义花哨旋转。

【负面限制】
不要平稳广告片镜头，不要一直侧面跟拍，不要慢动作，不要简单撕扯式抢球，不要人物无逻辑乱跑，不要低幼卡通，不要写实真人风，不要战争警察武器，不要人物变脸，不要空间混乱，不要车辆穿模，不要光球消失、复制、变形，不要廉价赛博朋克。
```

</details>

<a id="image-reference-15"></a>
### 32. Black Truffle Nut Crisp Showcase

`wan3.0-reference-video` · 15s · 2:3 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=image-reference-15#image-reference-15)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Two reference images drive a product showcase that moves from wide view to close-up, then flips to show the back label.

<table>
<tr><th>Image1</th><th>Image2</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-c5a10eba63fd.webp" width="220" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-2f3b7b7fcafb.webp" width="220" alt="Image2"></td><td align="center"><video src="https://github.com/user-attachments/assets/e75abf71-c46e-4097-a7ad-bceef9d08176" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Shot 1: a wide view with the 脆研社 black truffle sea salt mixed nut crisp from image 1 displayed centered on a kitchen wooden table, with a few almonds, cashews, walnut pieces, and black truffle slices scattered beside it as ambient props; the camera slowly pushes in. Shot 2: close-up, the front of the package fills the frame, clearly showing the round gold-foil wheat-ear nut badge logo at the top, the gold-foil calligraphy "脆研社", the product name "黑松露海盐混合坚果脆", three capsule labels "精选6种进口坚果" "0反式脂肪酸" "非油炸·低温轻烘焙", and the deep forest-green background with gold-foil color scheme, with the text sharp and legible. Shot 3: a hand picks up the package from above and flips it to show the back from image 2, displaying the densely printed ingredient list, the nutrition facts table, the manufacturer information, and the barcode at the bottom, with the milky-white small print clearly readable against the deep green background, then flips back to the front. Throughout, the gold-foil logo, text, deep forest-green color scheme, and printed patterns of the product packaging remain highly consistent and undistorted. E-commerce product-showcase style, warm tone with a sense of everyday life.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
镜头1：远景，厨房木桌场景中 图1 的脆研社黑松露海盐混合坚果脆包装居中陈列，旁边散落几颗巴旦木、腰果、核桃仁和黑松露薄片作为氛围道具，镜头缓推靠近；镜头2：特写，包装正面占满画面，清晰展示顶部烫金麦穗坚果圆形徽章Logo、"脆研社"烫金书法字、"黑松露海盐混合坚果脆"品名、三枚胶囊标签"精选6种进口坚果""0反式脂肪酸""非油炸·低温轻烘焙"及深森林绿底色烫金配色，文字锐利可辨；镜头3：一只手从上方拿起包装翻转至 图2 的背面，展示密排的配料表、营养成分表格、生产商信息及底部条形码，奶白色小字在深绿底色上清晰可读，随后翻回正面；全程产品包装的烫金Logo、文字、深森林绿配色与印刷花纹保持高度统一不变形。电商产品展示风格，暖调生活感
```

</details>

<a id="video-reference"></a>
## 🎥 Video reference

> Borrow the camera work or motion of a reference clip and change the scene. · 3 cases

<a id="video-reference-01"></a>
### 33. Skateboard Motion, New Rider

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-reference-01#video-reference-01)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Keeps the reference clip's skateboard moves and trajectory, swapping only the rider for the woman in image 1.

<table>
<tr><th>Image1</th><th>Video1</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-496a8fc52504.webp" width="220" alt="Image1"></td><td align="center"><video src="https://github.com/user-attachments/assets/0be4c9d8-2a7b-43b6-93cc-5ddeeafbaac0" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/cbe7e20f-7437-4634-9a5e-d8d5948fecd9" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Reference video. Replace the skateboarder in @Video1 with the woman and her clothing from @Image1. Note: only the person is replaced; the skateboard moves, motion trajectory, and skate park background from the original video stay completely unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
参考视频，视频1 @Video 中的滑板男人替换为图片 @Image1 中的女人和衣服，注意：只替换人物，保留原视频中滑板动作、运动轨迹和滑板场背景完全保持不变。
```

</details>

<a id="video-reference-02"></a>
### 34. Coffee on Rooftop, Reference Camera

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-reference-02#video-reference-02)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Borrows the reference clip's camera movement to film a single coffee cup on a rooftop café table.

<table>
<tr><th>Video1</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/adb66782-01c0-43ac-b187-5c4bb014ec8f" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/3b25d3e2-bd6d-4bde-891d-02f319adb650" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Reference the camera movement of the reference video, and change the scene to a single cup of coffee placed on a café table on a rooftop.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
参考视频的运镜方式，场景更改为一杯咖啡放在天台咖啡桌上。
```

</details>

<a id="video-reference-03"></a>
### 35. Energy Effect Transfer to Person

`wan3.0-reference-video` · 5s · 9:16 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-reference-03#video-reference-03)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Transfers the energy effect and motion from the reference video onto the person in image 1.

<table>
<tr><th>Image1</th><th>Video1</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-c887f989b976.webp" width="220" alt="Image1"></td><td align="center"><video src="https://github.com/user-attachments/assets/7d786e5f-d256-4bcb-809c-9ba0ccdd069a" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/97e7ef06-50f2-41fb-ae8d-01465dd7a3e0" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
The person in image 1 references the energy effect of video 1; generate the same effect and motion.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
图片1人物参考视频1的能量特效，生成同样的特效和动作。
```

</details>

<a id="audio-reference"></a>
## 🎵 Audio reference

> Set a voice, a beat or a mood from audio you upload. · 3 cases

<a id="audio-reference-01"></a>
### 36. Gym Buddies Plan Their Workout

`wan3.0-reference-video` · 15s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=audio-reference-01#audio-reference-01)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Two women stand side by side by treadmills trading lines in reference voices, in a bright, realistic gym.

<table>
<tr><th>Image1</th><th>Image2</th><th>Audio1</th><th>Audio2</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-3da5a2250839.webp" width="150" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-dfd5b66ee8a1.webp" width="150" alt="Image2"></td><td align="center"><a href="https://media.apiko.app/prompts/wan-3-0/cf1fbe09-4e9b-4e12-b71b-beb9127a58a3.m4a">🎵 Audio1</a></td><td align="center"><a href="https://media.apiko.app/prompts/wan-3-0/27f3aecd-6158-4808-9d6b-7c1871d1b826.m4a">🎵 Audio2</a></td><td align="center"><video src="https://github.com/user-attachments/assets/737e352f-b50f-41d4-80a2-ad6879682f65" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Define the woman in image 1 as Subject 1, and the woman in image 2 as Subject 2. Subject 1's dialogue voice timbre references audio 1, and Subject 2's dialogue voice timbre references audio 2. Inside a gym, Subject 1 and Subject 2 stand side by side next to a treadmill. Subject 1 turns her head, smiles, and says to Subject 2: {Which muscle group are we training today}. Subject 2, while wiping sweat with a towel, replies: {Let's do back, my legs are still sore from yesterday}. Subject 1 smiles and nods, saying: {Fine, I'll join you, but warm up for ten minutes first}. Subject 2 picks up a water cup, takes a sip, and replies: {Let's go}. The background is the weight-machine area and a floor-to-ceiling mirror. Realistic filming, bright and clear image, cool white tone with natural saturation.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
将图片1中的女人定义为主体1，将图片2中的女人定义为主体2，主体1台词音色参考音频1，主体2台词音色参考音频2，在健身房内，主体1和主体2并排站在跑步机旁，主体1转头微笑对主体2说{今天练哪个部位}，主体2一边用毛巾擦汗一边回应{练背吧，昨天腿还酸着呢}，主体1笑着点头说{行，我陪你，先热身十分钟}，主体2拿起水杯喝一口回应{走吧}，背景是器械区和落地镜，写实拍摄，画面明亮通透，冷白色自然饱和度色调
```

</details>

<a id="audio-reference-02"></a>
### 37. Idol Dance to Audio Beat

`wan3.0-reference-video` · 15s · 9:16 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=audio-reference-02#audio-reference-02)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

A vertical fixed shot of a young woman dancing an idol routine in a kitchen, choreographed to the reference audio's beats.

<table>
<tr><th>Audio1</th><th>Output</th></tr>
<tr><td align="center"><a href="https://media.apiko.app/prompts/wan-3-0/84fd2eef-c771-4856-ab92-c92095ec1660-15s.m4a">🎵 Audio1</a><br><sub>The reference audio was trimmed to 15 s to fit the API limit.</sub></td><td align="center"><video src="https://github.com/user-attachments/assets/554da218-d330-47a7-be71-73ff17078d3b" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Vertical 9:16, full-body shot, fixed and stable camera. A young woman with long black hair, wearing a white floral-embroidered long-sleeved top, a white pleated short skirt with a black waist belt, and white thick-soled sneakers, dances an idol-style routine in a modern minimalist kitchen to the beat of the fixed audio. The background is light grey cabinets, a white island counter, and a dark night-view window; a square fill light behind her forms a rim light, and the indoor lighting is cool white.
Choreograph the dance according to the rhythm, tempo, and emotional rises of the fixed audio: heavy drum beats correspond to crisp, large-scale moves and held poses; gentle passages correspond to soft body waves and hand gestures; chorus climaxes have denser, more explosive movement. Overall it is an idol-style dance, with coherent and fluid moves that are rhythmic and expressive, fully synchronized with the audio beats.
Smooth motion, natural limb proportions.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
竖屏9:16，全身镜头，固定稳定机位。一位长黑发的年轻女性，身穿白色花朵刺绣长袖上衣、白色百褶短裙配黑色腰带、白色厚底运动鞋，在现代简约风厨房中，跟随固定音频的节拍跳偶像风舞蹈。背景为浅灰色橱柜、白色岛台、深色夜景窗户，人物身后有一块方形补光灯形成轮廓光，室内冷白色灯光。
根据固定音频的节奏、速度和情绪起伏进行舞蹈编排：鼓点重拍对应干脆利落的大幅度动作与定格姿势，舒缓段落对应柔和的身体波浪与手部姿态，副歌高潮段落动作更密集更有爆发力。整体为偶像风舞蹈，动作连贯流畅，富有节奏感和表现力，与音频节拍完全同步。
运动流畅，肢体比例自然。
```

</details>

<a id="audio-reference-03"></a>
### 38. Man on Phone by the Window

`wan3.0-reference-video` · 15s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=audio-reference-03#audio-reference-03)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Swaps the man from image 1 into the woman's place, voiced with the reference timbre, for a 15-second window-side call.

<table>
<tr><th>Image1</th><th>Video1</th><th>Audio1</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-733ad275a5d5.webp" width="220" alt="Image1"></td><td align="center"><video src="https://github.com/user-attachments/assets/35c9877b-226b-44c0-a53d-908a1892c620" width="220" controls muted playsinline></video></td><td align="center"><a href="https://media.apiko.app/prompts/wan-3-0/d28c45e4-7776-465a-a9c2-bedd07dd987f.m4a">🎵 Audio1</a></td><td align="center"><video src="https://github.com/user-attachments/assets/c7486e88-54fc-4207-ab27-478bdb791049" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Seamlessly replace the male character in image @Image1 into the woman in video @Video1. The character sits by the window, holding a phone to his ear and talking.
[Timbre and dialogue] Extract the timbre features from @Audio1, and have the character say the following line: “Really? That sounds great! When are you coming back? I miss you so much.”
[Lip sync and expression] The generated speech must drive the character's mouth opening and closing precisely and naturally. While speaking, add natural blinking, slight head nods, and a sense of breathing; the facial micro-expressions must match the caring and nostalgic emotion of the line perfectly.
[Light and scene] The character's face naturally receives a mix of warm indoor light and the cool neon light from outside the window. Raindrops keep slowly sliding down the window outside, a faint trace of steam rises from the coffee on the table, and the edges of the character blend naturally into the scene with no cutout traces.
[Camera and image quality] A 15-second long take, with the camera pushing in extremely slowly, a very stable image, cinematic lighting, 8K resolution, and photorealistic detail.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
将图片 @Image1 的男性角色无缝替换至视频 @Video1 的女生。角色坐在窗边，手持手机贴耳说话。

【音色与台词】提取音频 @Audio1 中的音色特征，并让角色说出以下台词：“真的吗？听起来很棒！你什么时候回来啊。我好想你啊.”

【口型与神态】生成的语音需精准驱动角色的口型自然开合。说话时伴随自然的眨眼、轻微的头部点动和呼吸感，面部微表情需与台词中的关怀、回忆情绪完美契合。

【光影与场景】人物面部需自然接收室内暖光与窗外霓虹冷光的混合照明。背景窗外雨滴持续缓慢滑落，桌上咖啡有轻微热气升腾，人物与场景边缘融合自然，无抠图痕迹。

【镜头与画质】15秒长镜头，镜头极缓慢向前推进，画面极度稳定，电影级光影，8K分辨率，照片级真实感。
```

</details>

<a id="video-edit"></a>
## ✂️ Video editing

> Change one thing in an existing clip and leave the rest as it was. · 15 cases

<a id="video-edit-01"></a>
### 39. Pool Clutter Removal

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-01#video-edit-01)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Removes floats and poolside clutter by filling with surrounding water and paving, keeping the floating woman untouched.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/88903f60-1ee6-49c4-b023-3b893620a766" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/944ca172-636e-43e7-9737-af2571118115" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Remove all the blue and yellow swim rings from the pool surface in video 1, and also remove the drawing paper, paint pots, brushes, and the black storage box on the stone slab by the poolside. Fill the gaps naturally with the surrounding pool water and stone paving. Keep only the woman floating in the pool; her posture and movements and the pool background stay unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
将视频1中泳池水面上的蓝色和黄色游泳圈全部去掉，池边石板地上的画纸、颜料罐、画笔和黑色收纳箱也全部去掉，用周围泳池水面和石板地面自然填充。仅保留女人漂浮在泳池中，女人的姿态动作和泳池背景保持不变。
```

</details>

<a id="video-edit-02"></a>
### 40. Add Vase to Wooden Table

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-02#video-edit-02)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Inserts the vase from image 1 onto an empty spot on the table, matching window light, with the woman's motion unchanged.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/8bd07b8e-5fe2-4de8-90cc-3845af015353" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/7bb9cc76-82d6-4375-b929-2d2eefd5d2c8" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Edit video 1: on the empty spot on the wooden table to the right of the woman, add the vase from image 1. The light and shadow of the vase match the direction of the natural light from the window, blending naturally into the wooden-table scene. The woman's movements and the rest of the frame stay unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
编辑视频，视频1中女人右侧桌面空位处新增图片1中的花瓶，花瓶光影与窗户自然光方向一致，自然融入木桌场景。女人的动作和画面其余部分保持不变。
```

</details>

<a id="video-edit-03"></a>
### 41. Remove Man on the Left

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-03#video-edit-03)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Erases the man on the left and fills the gap with background, leaving the other people and motion intact.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/cf8ea4b6-4c5f-49f7-a327-fb99d200166d" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/b0e1b124-1c5e-46fa-b6c6-d333554618b0" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Remove the man on the left in video 1, and naturally fill that position with the surrounding background. The other people, their actions, and the rest of the frame stay unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
视频1中左边的男人去掉，用周围背景自然填充该位置，其余人物、动作和画面保持不变。
```

</details>

<a id="video-edit-04"></a>
### 42. Girl Re-cast as Young Woman

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-04#video-edit-04)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Keeps the upward gaze and street scene while the child becomes a twenty-something woman in a slim long dress.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/0a34f3df-ed5e-43e4-a6ba-ceb2135fb10c" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/d1c4e397-a3d8-4ba3-9cd3-56a124839549" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
In video 1, the little girl becomes a young woman of about twenty with a mature face. Her dress is replaced by a slim long dress in the same color family. Her action of tilting her head back to look up at the city neon, along with her expression and demeanor, stays consistent. The Times Square street scene and the rest of the frame remain unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
视频1中的小女孩变成一位二十岁左右的年轻女人，面容成熟，连衣裙替换为同色系的修身长裙，仰头望向城市霓虹的动作和表情神态保持一致，时代广场街景和画面其余部分不变。
```

</details>

<a id="video-edit-05"></a>
### 43. Enlarged Sailboat on Water

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-05#video-edit-05)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Scales up the sailboat on the left proportionally, with sharper mast and sail details and matching reflections.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/0464e865-3d3d-41ae-89a9-d9d8a5ce1233" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/be3dec11-56ec-4154-a803-f960c1715e1a" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
In video 1, scale the sailboat on the left up proportionally to make it more visually imposing, with the mast and sail details more prominent. The water reflection is adjusted to match. The person on the right, the distant fleet, and the sea mist stay unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
视频1中左侧的帆船等比放大，使其更具视觉压迫感，桅杆和船帆细节更突出，水面倒影同步匹配。右侧人物、远处船队和海面雾气保持不变。
```

</details>

<a id="video-edit-06"></a>
### 44. Remove Hat, Show Natural Hair

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-06#video-edit-06)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Removes the hat from the woman's head to reveal natural hair, with her motion and the rest of the frame unchanged.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/809846f0-25b2-48e4-b29d-e702cbec1a3f" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/238a1fa5-3a87-48fc-b754-ba19bad4eff8" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Remove the hat from the woman's head in video 1, revealing a natural hairstyle. The woman's movements and the rest of the frame stay unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
视频1中女人头上的帽子去掉，露出自然发型，女人的动作和画面其余部分保持不变。
```

</details>

<a id="video-edit-07"></a>
### 45. Half-Buried Rock on Beach

`wan3.0-reference-video` · 10s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-07#video-edit-07)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Adds a rock half-buried in wet sand, with receding waves gently lapping at its base.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/214b4b44-e867-496f-80c7-10316f21f2e1" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/59963fb8-eefa-42ca-8f90-c961d079b56a" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Edit the content of video 1. Add a rock on the beach, half-buried in the wet sand; when the waves recede, let the seawater gently cover the base of the rock.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
编辑视频1的内容。在沙滩上添加一块礁石，使礁石半埋在湿沙中，当海浪退潮时让海水轻轻没过礁石底部。
```

</details>

<a id="video-edit-08"></a>
### 46. Skater Swapped to Short-Haired Woman

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-08#video-edit-08)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Keeps the skating moves and skate park, swapping the rider for a short-haired woman in a sports tank and cargo pants.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/5e48785c-60c1-4f95-8eeb-805e0d98172c" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/64c41541-7918-42d4-b378-9ece6ef17699" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Edit the video: replace the skateboarder in video 1 with a short-haired woman wearing a sports tank top and loose cargo pants. Keep the baseball cap and the protective gear, such as knee and elbow pads, from the original video. The skateboard moves, motion trajectory, and skate park background stay completely unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
编辑视频，视频1中的滑板男人替换为一位短发女人，穿运动背心和宽松工装裤，保留原视频中的棒球帽、护膝护肘等护具，滑板动作、运动轨迹和滑板场背景完全保持不变。
```

</details>

<a id="video-edit-09"></a>
### 47. Remove Sunglasses, Show Eye Makeup

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-09#video-edit-09)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Removes the woman's sunglasses to reveal natural eye makeup and gaze, with everything else unchanged.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/b8b9cd1e-3315-4822-82dc-1e3211585054" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/4ce08867-1977-4222-ad92-2a10e1d97992" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Edit the video: remove the woman's sunglasses in video 1, revealing her natural eye makeup and gaze. The woman's movements and the rest of the frame stay unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
编辑视频，视频1中女人的墨镜去掉，露出自然眼妆和眼神，女人的动作和画面其余部分保持不变。
```

</details>

<a id="video-edit-10"></a>
### 48. Brighten With TV-Style Three-Point Light

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-10#video-edit-10)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Brightens the whole frame with soft TV-style three-point lighting, removing the hard shadow on the man's right cheek.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/a96898c6-cea1-4c74-9214-650171a19b65" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/e8e20656-4980-4766-85cd-97e12f5ebdc3" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Edit the video: brighten the overall lighting of video 1, adopting soft TV-drama-style three-point lighting, and eliminate the hard shadow on the right side of the man's face so that his facial features are evenly lit and his skin looks natural and clear. The white tile wall and the window light are raised in sync, keeping the overall tonal balance of the frame unified. The man's movements and the content of the frame remain unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
编辑视频，视频1整体提亮光线，采用美剧质感的柔和三点布光，消除男人面部右侧的硬阴影，让五官轮廓均匀受光，肤色自然通透。背景白色瓷砖墙和窗户的光感同步提升，保持画面整体影调统一，男人的动作和画面内容不变。
```

</details>

<a id="video-edit-11"></a>
### 49. Swap Positions: Suited Man and Ostrich

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-11#video-edit-11)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

The suited man and the ostrich swap places, with matching walking rhythm and the street background unchanged.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/6bfd77e4-35f6-446c-b81e-1a8bde02cbbc" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/f47d6219-705f-4f0c-bdce-be6c85f0e74d" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Edit the video: swap the positions of the suited man and the ostrich in video 1. The ostrich moves to the front-left of the frame, and the man moves to the right, closely following the ostrich. Their walking movements and step rhythm stay consistent, and the street background is unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
编辑视频，视频1中西装男人和鸵鸟的位置互换，鸵鸟移到画面左侧靠前位置，男人移到右侧紧跟鸵鸟，二者的行走动作和步伐节奏保持一致，街道背景不变。
```

</details>

<a id="video-edit-12"></a>
### 50. Whole Clip to Claymation

`wan3.0-reference-video` · 15s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-12#video-edit-12)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Restyles the entire clip as claymation while keeping the original content.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/8adedf8a-b6f0-4723-a8a5-99af55c1e4d2" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/b773eb65-3ab5-4690-9d60-f65af0381ce5" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Edit the video: change the style of the video to claymation style.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
编辑视频，将视频风格变为粘土动画风格
```

</details>

<a id="video-edit-13"></a>
### 51. Swap Line to English Dialogue

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-13#video-edit-13)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Keeps the picture and motion, rewriting the young man's line into a short English sentence about a deal and vanishing.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/0646086f-ee50-4ea7-b97c-7de0e71257bb" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/c8b3c7df-fa0c-433f-9d3d-219993075792" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Edit the video: change the young man's line to: “The deal is done.Now... we disappear.”
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
编辑视频，将视频中男生的台词改为：“The deal is done.Now... we disappear."
```

</details>

<a id="video-edit-14"></a>
### 52. Reference Hats and Denim Shirt

`wan3.0-reference-video` · 5s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-14#video-edit-14)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Puts the reference hats on both people and swaps the man's shirt for a washed-blue denim shirt, with motion unchanged.

<table>
<tr><th>Source video</th><th>Image1</th><th>Image2</th><th>Image3</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/24c128c9-44f6-435c-9acf-182e5d437728" width="150" controls muted playsinline></video></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-ebff47c4b312.webp" width="150" alt="Image1"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-a05daa6fe849.webp" width="150" alt="Image2"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-ca131eed493c.webp" width="150" alt="Image3"></td><td align="center"><video src="https://github.com/user-attachments/assets/72d771a2-9372-4979-a74b-de61afacc08d" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Edit the video: the woman in video 1 wears the hat from image 1, fitting naturally to the shape of her head. The man in video 1 wears the hat from image 2, fitting naturally to his head shape, and his ochre-brown shirt is replaced with the washed-blue loose denim shirt from image 3, with the lapels open and the sleeves rolled up to the forearms. The movements and clothing of both people, and the rest of the frame, remain unchanged.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
编辑视频，视频1中的女人戴上 图片1 中的帽子，自然贴合头型。 视频1 中的男人戴上中 图片2 的帽子，自然贴合头型，男人的赭棕色衬衫换成 图片3 中的蓝色水洗宽松牛仔衬衫，翻领敞开、袖子卷至前臂。两人的动作、服装和画面其余部分保持不变。
```

</details>

<a id="video-edit-15"></a>
### 53. Man Picks Up Guitar and Plays

`wan3.0-reference-video` · 15s · 9:16 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-edit-15#video-edit-15)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Rewrites the plot so the man picks up a guitar and starts playing a tune right away.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/9a025596-92fb-4d6e-b02d-9fc805072ecd" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/5ed9cad8-0617-4032-98bf-e9fbed2bad59" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Reshape the plot of @Video1: the man directly picks up a guitar and begins playing a piece of music.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
重塑@Video1 的剧情，让男人直接拿起吉他开始演奏一段音乐
```

</details>

<a id="video-extend"></a>
## ⏩ Video extension

> Continue a clip with new action, dialogue and sound. · 3 cases

<a id="video-extend-01"></a>
### 54. Teahouse Shipment Negotiation

`wan3.0-reference-video` · 20s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-extend-01#video-extend-01)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Extends the clip 15 seconds: two gowned men settle a shipment deadline in a teahouse with a tabletop tap and a raised lid bowl.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/78edb870-fd1c-44df-9659-5064ef5e459b" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/aa4294fb-87d7-47a9-bf33-e39dc5dae5a7" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Extend video 1 by 15 seconds. Character A is a man with a slicked-back hairstyle, wearing a dark grey Chinese long gown, with a brown prayer-bead bracelet on his left wrist. Character B is a man wearing a dark Chinese long gown. Character B slowly sets down his tea bowl, his gaze sinking slightly, and taps the tabletop twice with his fingertip, saying calmly and unhurriedly: “The price can be discussed, but when will the goods arrive at port? Give me a definite date.” Character A's smile does not fade; he picks up the lidded bowl and scrapes off the tea foam. Character A sips his tea, sets the bowl back on its saucer, leans forward and lowers his voice, the prayer beads swaying slightly with his gestures, and says with assurance: “By the end of the month at the latest. I've already arranged everything at the dock over there, and the whole shipment will be delivered to your warehouse door in good order.” He then presses his right palm down onto the tabletop, palm facing down, and looks directly at Character B. Character B pauses in thought, his gaze sweeping toward the window and the signboard reading “萬安當”, while a bamboo blind is gently lifted by a breeze from the street. He turns back, a smile rising at the corners of his mouth, lifts the lidded bowl slightly toward Character A and says: “Good. Delivery by month's end. I'll be waiting for good news from you.” The two look at each other and smile. Maintain the composed tone of a Republican-era commercial drama, with unhurried dialogue rhythm and low, murmuring teahouse ambience as the bed of sound.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
将视频1延长15s。角色A为梳背头、穿深灰色中式长衫、左手腕佩戴棕色佛珠手串的男人，角色B为穿深色中式长衫的男人。角色B缓缓放下茶碗，目光微沉，用指尖轻叩桌面两下，不紧不慢说"价钱好讲，但货要几时到埠，你要畀个准数我。"角色A笑容不减，端起盖碗刮了刮茶沫。角色A呷一口茶，将茶碗搁回茶托，身体前倾压低声音，佛珠随手势轻晃，语气笃定"最迟月底，码头嗰边我已经打点好晒，一船货齐齐整整运到你仓库门口。"说罢右手掌心朝下往桌面一按，目光直视角色B。角色B沉吟片刻，视线扫向窗外"萬安當"牌匾，竹帘被街上微风轻轻掀起。他转回头，嘴角浮起笑意，拿起盖碗朝角色A微微一举，"好，月底交货，我等你好消息。"两人相视而笑。保持民国商战片的沉稳调性，对话节奏从容，茶馆环境音低沉衬底。
```

</details>

<a id="video-extend-02"></a>
### 55. Waltz Invitation in Ballroom

`wan3.0-reference-video` · 20s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-extend-02#video-extend-02)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Extends the clip 15 seconds: in a ballroom, the gentleman offers his hand and the pair step onto the floor to waltz.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/a5a194c6-cce2-4f29-a0b4-0fae1e261e02" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/78485779-2b87-4e7e-82ba-bcf061f44a09" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Extend video 1 forward by 15 seconds. Character A is a man with short brown hair, dressed in a black tailcoat, white shirt, black bow tie, and a beige waistcoat. Character B is a woman with a brown updo, wearing a beige puff-sleeve vintage long dress with black lace trim on the skirt and dark teardrop earrings. Under the crystal chandeliers of the ballroom, the light falls onto the marble floor. Guests stand in twos and threes, chatting quietly with glasses in hand, and a graceful waltz string prelude slowly begins; the conversation gradually quiets. Character B walks slowly in from one side of the ballroom, the hem of her skirt brushing lightly across the marble floor, her gaze sweeping around. Character A steps out from the crowd, passes between the guests and walks directly to Character B. He bows slightly and extends his right hand, looking at her tenderly. Character B lowers her eyes with a faint smile and lightly rests her right hand in his palm; the two exchange a smile. Character A leads Character B to the center of the dance floor, and the surrounding guests naturally step back to make room, their gazes converging on the two. Character A lifts her right hand with his left, his right hand gently supporting the small of her back. The two take their waltz position and, on the strong beat of the strings, step off with the first step and begin to turn. The elegant atmosphere of a 19th-century court ball, in warm golden tones.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
将视频1向前延长15s。角色A为穿黑色燕尾服、白色衬衫、黑色领结及米色马甲的深棕色短发男性，角色B为穿米色泡泡袖复古长裙、裙身带黑色蕾丝花边、佩戴深色水滴耳环的棕色盘发女性。舞厅内水晶吊灯光芒映照大理石地面，宾客们三两交谈持杯低语，一段悠扬的华尔兹弦乐前奏缓缓响起，人群的谈话声逐渐安静。角色B从舞厅一侧缓步走来，裙摆轻拂过大理石地面，目光环顾四周。角色A从人群中走出，穿过宾客径直来到角色B面前，微微欠身伸出右手，目光温柔注视着她。角色B垂眸浅笑，将右手轻轻搭上角色A的掌心，两人相视一笑，角色A引领角色B步入舞池中央，周围宾客自然后退让出空间，目光齐聚二人。角色A左手握住角色B右手举起，右手轻扶她的腰后，两人摆好华尔兹舞姿，随弦乐正拍踏出第一步，开始旋转。19世纪宫廷舞会的典雅氛围，暖金色调。
```

</details>

<a id="video-extend-03"></a>
### 56. Snowy Path Smile, Both Ways

`wan3.0-reference-video` · 10s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=video-extend-03#video-extend-03)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Adds two seconds before and three after: the girl walks toward the lens, breathes in the cold, then catches a snowflake and smiles.

<table>
<tr><th>Source video</th><th>Output</th></tr>
<tr><td align="center"><video src="https://github.com/user-attachments/assets/ef32536e-c46b-45fe-8232-adae330d16a1" width="220" controls muted playsinline></video></td><td align="center"><video src="https://github.com/user-attachments/assets/dda2f74e-24dd-41ef-a054-46834ee0c318" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Extend two seconds forward, using the video as the middle section: the camera smoothly follows, and the girl slowly walks toward the lens, stops, gently lifts her head slightly, takes a deep breath of the cold air, with her lips slightly parted. Extend three seconds backward, using the video as the middle section: the girl finishes rubbing her hands, looks straight into the lens, and breaks into a warm, radiant smile. She slowly raises one gloved hand to catch a lightly falling snowflake, and the camera slowly pulls back to a medium-wide shot, revealing a snowy forest path in sunlight, with golden-hour backlight, lens flare, shallow depth of field, and a warm, healing atmosphere.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
以视频为中间段向前续写两秒：镜头平滑跟随，女孩向镜头缓缓走来，停下脚步，温柔地微微抬头，在冷空气中深吸一口气，嘴唇微张；以视频为中间段向后续写三秒：女孩搓完手，直视镜头，绽放出温暖灿烂的笑容。她缓缓抬起一只戴着手套的手，去接一片轻轻飘落的雪花，镜头缓慢后拉成中远景，展现阳光雪林小路，黄金时刻逆光，镜头光晕，浅景深，温暖治愈氛围。
```

</details>

<a id="first-last-frame"></a>
## 🎞️ First and last frame

> Pin the opening frame, or both ends, and describe what happens between them. · 3 cases

<a id="first-last-frame-01"></a>
### 57. Ink Swordsman in Bamboo Grove

`wan3.0-image-to-video` · 20s · 9:16 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=first-last-frame-01#first-last-frame-01)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

An ink-painted swordsman in a bamboo grove faces two assassins across five timed beats, ending on a frozen strike.

<table>
<tr><th>First frame</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-dfcdcb99eb72.webp" width="220" alt="First frame"></td><td align="center"><video src="https://github.com/user-attachments/assets/ba544b6a-e0c0-4276-acdb-68f265115d4d" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
(0:00 - 0:03) Camera: medium shot.
Scene: continuing the ink-wash bamboo grove scene from @Image1. A swordsman in a bamboo hat and a black-ink robe stands motionless, his silhouette at the center of a bamboo grove wrapped in thick mist and swaying shadows.
Action: the swordsman's left hand rests lightly on the sword hilt, and bamboo leaves drift down in the wind.
Mood: silent and oppressive, with the grain of ink-wash blooms clearly visible.

(0:03 - 0:08) Plot introduction. Camera: close-up.
Plot: the swordsman senses killing intent.
Scene: the camera quickly pushes in to a close-up beneath the swordsman's bamboo hat.
Detail: the edge of the hat reveals a pair of sharp, resolute eyes, like blades. An ink-wash "bead of sweat" slides down from the forehead.
Action: the swordsman's right hand slowly tightens on the sword hilt, the knuckles going pale. The bamboo leaves fall faster.

(0:08 - 0:13) Camera: fast orbit.
Scene: the camera orbits rapidly around the swordsman as its center.
Plot: two assassins, also rendered as ink-wash silhouettes, burst out from deep within the bamboo grove, holding twin hooked blades and short daggers.
Detail: the assassins' movements are also formed of ink-brush strokes, like flowing ink. The camera sweeps quickly across the assassins' figures, emphasizing speed.

(0:13 - 0:18) Camera: handheld feel, high-speed capture.
Combat: the swordsman suddenly draws his blade, and the blade's light is a pure white ink-brush crack. The assassins attack with their hooked blades.
Detail:
First strike: the swordsman turns and cuts back; the blade collides with the assassin's hooked blades, bursting out countless black-and-white sparks and ink dots with a calligraphic quality.
Second strike: the swordsman feints, then uses the bamboo pole's spring to strike down from above. The assassin rolls to dodge. The bamboo pole is cut through and turns into scattered ink traces.
Third strike: the swordsman's blade tip points directly at the other assassin's throat; the assassin blocks with a short dagger, and the camera captures the fine detail of ink cracking where blade meets dagger.

**(0:18 - 0:20) Camera: slow motion to freeze frame.**

* **Frame:** the swordsman's blade rests against the side of an assassin's neck, and the assassin freezes.
* **Detail:** the swordsman's bamboo hat is slightly tilted from the fight. The bamboo grove returns to stillness, with more leaves dancing in the air.
* **Mood:** the camera slowly pulls back to a medium shot, freezing on the image of the swordsman sheathing his blade while the assassin falls to the ground.
* **On-screen text (optional):** ink-wash style text appears at the bottom of the frame: "江湖，不过一笔勾销。"

**Style notes:** the whole sequence keeps the highly monochrome, ink-wash painting style of image_0.png; the movements must have brush-stroke texture, the speed must be fast, and details must be rich (ink drops, sparks, ink-trace cracks).
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
(0:00 - 0:03) 运镜：中景。
画面：沿用 @Image1 的水墨竹林场景。头戴斗笠、身着墨色长袍的刀客，其剪影伫立在浓雾环绕、竹影婆娑的中心。
动作：刀客左手轻按刀柄，竹叶随风飘落。
氛围：寂静，压抑，水墨晕染的颗粒感清晰可见。

(0:03 - 0:08) 剧情引入，运镜：特写。

剧情：刀客察觉杀气。
画面：镜头快速推进到刀客斗笠下的特写。
细节：斗笠边缘露出一双凌厉、决绝的眼睛，眼神如刀。水墨晕染的“汗珠”从额头滑落。
动作：刀客右手缓缓握紧刀柄，指关节泛白。竹叶飘落的速度加快。

(0:08 - 0:13) 运镜：快速环绕。

画面：镜头以刀客为中心快速环绕。
剧情：两名同样是水墨剪影的刺客从竹林深处杀出，手持双钩和短刃。
细节：刺客的动作也是水墨笔触构成的，如墨迹流动。镜头快速掠过刺客的身影，强调速度感。

(0:13 - 0:18) 运镜：手持感，高速捕捉。

打斗：刀客猛然拔刀，刀光是一道纯白色的水墨裂痕。刺客双钩攻来。
细节：
一击：刀客回身一斩，刀刃与刺客双钩碰撞，迸发出无数黑白相间、带有书法感的火花和墨点。
二击：刀客虚晃一枪，利用竹竿弹射，从高处劈下。刺客翻滚躲避。竹竿被打断，化作飞散的墨痕。
三击：刀客刀尖直指另一刺客咽喉，刺客以短刃格挡，镜头捕捉刀刃与短刃摩擦时细微的墨迹崩裂细节。



**(0:18 - 0:20) 运镜：慢镜头至定格。**

* **画面：** 刀客的刀停在刺客颈侧，刺客凝固。
* **细节：** 刀客的斗笠在打斗中略微倾斜。竹林归于平静，更多竹叶飞舞。
* **氛围：** 镜头慢慢拉远，回到中景，定格在刀客收刀、刺客倒地的画面。
* **文字（可选）：** 画面下方显现水墨风文字：“江湖，不过一笔勾销。”

**风格说明：** 整个过程保持 `image_0.png` 的高度黑白、水墨画风格，动作必须有毛笔触感，速度要快，细节要足（墨滴、火花、墨痕裂口）。
```

</details>

<a id="first-last-frame-02"></a>
### 58. Woman in Straw Hat Remembers

`wan3.0-image-to-video` · 30s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=first-last-frame-02#first-last-frame-02)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Bridges two first-and-last frames across four 35mm film shots, from a rose garden to a rain-streaked car window, fading to black.

<table>
<tr><th>First frame</th><th>Last frame</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-39f49617fb9e.webp" width="220" alt="First frame"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-43788c0e1dd8.webp" width="220" alt="Last frame"></td><td align="center"><video src="https://github.com/user-attachments/assets/0f5f3baa-774b-49c7-80d9-4ab08cc398aa" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
Shot 1: a beautiful past (00:00 – 00:08)
35mm film, a nostalgic sunlit garden. An elegant woman in a straw hat, a black necklace, and a white dress stands in front of a wall of blooming roses. The wind lifts her hair, and she touches the brim of her hat, her eyes gentle yet touched with a trace of reflection. The camera slowly pushes in; natural light flares, a soft warm color palette, shallow depth of field, extremely delicate motion, 4K high image quality.

Shot 2: a turning point of emotion (00:08 – 00:15)
Cinematic close-up. The woman slowly removes the straw hat from her head and lowers her head, her expression carrying a faint wistfulness and attachment. A soft breeze passes; the light and shadow in the frame change subtly, presenting a sense of story and narrative atmosphere, with 35mm film texture, deep and elegant, cinematic light.

Shot 3: returning to reality, inside the car (00:15 – 00:23)
A view from the back seat of a moving car: the same woman in profile, her hand resting on the car door, gazing at the window covered with raindrops. The blurred greenery and light outside the window recede quickly; the light inside the car is gloomy yet warm, her side profile is exquisite, extremely cinematic in emotion, with real film grain, slow-motion photography, elegant and melancholy.

Shot 4: the last lingering gaze (00:23 – 00:30)
An extreme close-up of the face. The woman slowly closes her eyes beside the car window, revealing a calm, released expression. Raindrops slowly slide down the glass of the window; the focus gradually shifts to the raindrops on the glass, the background figure blurring, and the frame gradually fades to a black screen. Wong Kar-wai style cinematic feel, deep-hearted and fluid.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
镜头 1：美好的过往（00:00 - 00:08）
35mm电影胶片，复古阳光花园，一位戴草帽、黑色项链和白色衣裙的优雅女子，站在盛开的玫瑰花墙前。风吹拂着她的发丝，她轻触帽檐，眼神温柔而带有一丝沉思。镜头缓慢拉近，自然光斑，柔和暖色调，浅景深，极其细腻的动态，4k高画质。

镜头 2：情绪的转折（00:08 - 00:15）
电影特写镜头，女子缓缓摘下头上的草帽，低下头，表情带有淡淡的怅惘与眷恋。柔和的风掠过，画面光影微变化，呈现出故事感与叙事氛围，35mm胶片质感，深沉优雅，电影感光线。

镜头 3：回归现实/车内（00:15 - 00:23）
行驶的车内后座视角，同一个女子侧颜，手枕在车门上，凝视着挂满雨滴的车窗外。窗外模糊的绿植与光影迅速退后，车内光线阴沉而温暖，侧面轮廓精致，极具电影情绪感，真实胶片颗粒，慢速摄影，优雅忧郁。

镜头 4：最后的凝望（00:23 - 00:30）
极近面部特写，女子在车窗旁缓缓闭上双眼，流露出沉静而释怀的表情。雨滴在车窗玻璃上缓缓滑落，焦距逐渐转移到玻璃雨滴上，背景人物虚化，画面逐渐淡出黑屏，王家卫风格电影感，深情且流畅。
```

</details>

<a id="first-last-frame-03"></a>
### 59. West Lake Water Goddess

`wan3.0-image-to-video` · 15s · 16:9 · **[▶ Run on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-wan-3.0-prompts&utm_content=first-last-frame-03#first-last-frame-03)** · [Handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9)

Between two anchor frames, a drop of West Lake water becomes a water goddess in one unbroken take, blue-teal against gold.

<table>
<tr><th>First frame</th><th>Last frame</th><th>Output</th></tr>
<tr><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-2244340a2b1b.webp" width="220" alt="First frame"></td><td align="center"><img src="https://media.apiko.app/prompts/wan-3-0/img-19663921317c.webp" width="220" alt="Last frame"></td><td align="center"><video src="https://github.com/user-attachments/assets/7118a9f5-799f-4dd9-bded-3f3b48684c7f" width="360" controls muted playsinline></video></td></tr>
</table>

**Prompt:**

```text
[One unbroken take, slow and lyrical camera movement, no editing, 15-second long take, mineral-pigment rock-painting texture colliding with 3D rendering, teal-blue × gilded-gold contrast]
Global settings: a Chinese-style rock-mineral painting texture, the grain of mineral pigments, gold-leaf texture, and a strong contrast of teal-blue and gilded gold. The setting is West Lake in the morning mist: the lake surface is a matte teal-blue wash, golden morning light pierces the clouds to form Tyndall light beams, and in the distance the stone pagodas of Three Pools Mirroring the Moon and the Leifeng Pagoda faintly appear through the fog. Nearby there are lotus leaves and lotus flowers. The main subject of the image is the water goddess of West Lake, "Xizi": rendered in a rock-painting texture, with an oval face, willow-leaf eyebrows, phoenix eyes, a cinnabar floral mark at the center of the brow, skin like mutton-fat white jade glowing softly, and a pale golden circular halo floating behind her head. Her high bun is fastened with a gilded lotus hairpin, and her skirt and shawl are formed of flowing lake water in a teal-blue gradient, its surface shimmering with glints of light.
Voiceover and sound effects: the background is soft guzheng and bamboo flute, with ambient sounds of faint water ripples and early morning birdsong. From the 8th second, an ethereal, gentle female voice slowly recites: "Wanting to compare West Lake to Xi Shi—"; at the turning-back moment the second half of the line follows: "Light makeup or heavy, always becoming." The pace is slow, with a slight echo and a long, lingering aftertone.
[0–3 seconds: one drop of water]
Extreme macro close-up. At the edge of a lotus leaf in the early morning, a drop of water gathers into a full bead, reflecting golden morning light, and slowly falls. The camera follows the drop with a downward tilt, and the drop lands in the lake, sending out a ring of golden-blue ripples that spread in layers.
[3–7 seconds: water takes shape]
At the center of the ripples, the lake water slowly rises and gathers into the figure of the goddess "Xizi": the water becomes her teal-blue skirt and translucent shawl, with fine streams of water flowing around her body. She slowly rises from the heart of the lake; her eyes close gently and then slowly open, and the gilded lotus hairpin lights with a faint glimmer. The camera slowly orbits around her half-lowered eyes and the skirt woven from flowing water.
[7–11 seconds: a lotus with every step]
She walks slowly across the surface of the lake with bare feet, and with every step a ring of golden ripples spreads beneath her, with lotus flowers blooming one after another in the ripples. The camera pulls back to a medium-wide shot: the mist disperses, and in the distance the three stone pagodas of Three Pools Mirroring the Moon light up with warm lamplight, the Leifeng Pagoda emerges in the morning light, and weeping willows brush the water along the bank. At the 8th second, the female narration begins: "Wanting to compare West Lake to Xi Shi—" Her shawl trails behind her, drawing a long golden-blue shimmer of water.
[11–15 seconds: turning back, always becoming]
She stops, turns back to look into the lens, and the camera slowly pushes in to a half-body close-up: morning light falls across her face, the water shawl drifts gently at her side, and a few shining droplets fall from the tips of her hair, turning into fine points of light in the air. The narration continues the second half of the line: "Light makeup or heavy, always becoming." She smiles faintly, and behind her are the Leifeng Pagoda in the morning light and the hazy Three Pools Mirroring the Moon. In the final second the frame freezes completely on her turning-back close-up, locking into a perfect cinematic poster composition.
```

<details>
<summary>Original prompt (Chinese)</summary>

```text
【一镜到底，慢速唯美运镜，无剪辑，15秒长镜头，岩彩画矿物颜料质感与3D渲染碰撞，青蓝×鎏金撞色】
全局设定：国风岩彩画质感，矿物颜料颗粒肌理，金箔质感，青蓝与鎏金强烈撞色。场景为清晨薄雾中的西湖：湖面呈哑光青蓝晕染，金色晨光穿透云层形成丁达尔光柱，远处三潭印月的石塔与雷峰塔在雾中若隐若现，近处有荷叶与荷花。画面主体是西湖水神"西子"：岩彩画质感，鹅蛋脸，柳叶眉，丹凤眼，眉心一点朱砂花钿，肌肤如羊脂白玉泛着柔光，头后悬浮一轮淡金色圆光；高挽发髻插一支鎏金荷花发簪，她的裙摆与披帛由流动的湖水构成，青蓝色渐变，表面水光粼粼。
配音与音效：背景为轻柔的古筝与竹笛，环境音有细微的水波声与清晨鸟鸣。第8秒起，一位空灵温柔的女声缓慢吟诵："欲把西湖比西子——"；回眸段接下半句："淡妆浓抹，总相宜。"语速缓慢，带轻微回响，余韵悠长。
[0-3秒：一滴水]
极近微距，清晨的荷叶边缘，一颗水珠凝聚饱满，映着金色晨光，缓缓坠落。镜头跟随水珠下摇（Tilt down），水珠滴入湖中，激起一圈金蓝色涟漪，涟漪层层扩散。
[3-7秒：水聚成形]
涟漪中心，湖水缓缓隆起，凝聚成神女"西子"的身形：湖水化作她的青蓝色裙摆与半透明披帛，细小水流在她周身环绕流动。她从湖心缓缓升起，双眸轻闭又缓缓睁开，鎏金荷花簪亮起微光。镜头缓慢环绕（Orbit）她半垂的眼眸与流水织成的裙摆。
[7-11秒：一步一莲]
她赤足踏在湖面上缓缓前行，每一步脚下都漾开一圈金色涟漪，涟漪中荷花次第绽放。镜头后撤拉远成中全景：薄雾散开，远处三潭印月的三座石塔亮起温暖灯光，雷峰塔在晨光中显现，岸边垂柳拂水。第8秒，女声旁白起："欲把西湖比西子——"她的披帛在身后拖出长长的金蓝色水光。
[11-15秒：回眸·总相宜]
她停下脚步，回眸看向镜头，镜头缓缓推近至半身特写：晨光洒在她的脸上，湖水披帛在身侧轻轻飘动，几滴发光的水珠从发梢滴落，在空中化作细碎光点。旁白接下半句："淡妆浓抹，总相宜。"她浅浅微笑，身后是晨光中的雷峰塔与朦胧的三潭印月。最后一秒画面完全定格在她的回眸特写，定格为完美的电影海报构图。
```

</details>

<a id="faq"></a>
## ❓ FAQ

<details>
<summary><b>Are these Wan 3.0 prompts free to use?</b></summary>

Yes, the prompts are free to copy, edit and run. The sample videos are Alibaba's, published in its public handbook: treat them as reference, not as footage of your own, and read Alibaba's terms before reusing them. For clips you generate, make sure you may use whatever you upload.

</details>

<details>
<summary><b>Do I need to write prompts in Chinese?</b></summary>

No. Wan 3.0 takes Chinese and English prompts of up to 20,000 characters. The official text is Chinese; the English, Traditional Chinese and Korean versions here are translations, and Copy gives the version in your site language.

</details>

<details>
<summary><b>How do I pass reference images, videos and audio through the API?</b></summary>

Send HTTPS URLs in reference_image_urls (up to 10), reference_videos (up to 5, 1-15 s each and 15 s in total) and reference_audios (up to 5) on Wan 3.0 Reference-to-Video. Image-to-Video takes first_image_url and last_image_url. Parameters and examples are in the Wan 3.0 docs.

</details>

<details>
<summary><b>What does a Wan 3.0 clip cost?</b></summary>

Billing is per second of output, and reference-video seconds count too. Dated prices from every provider are on the Wan 3.0 API price comparison.

</details>

<a id="related"></a>
## 🔗 Related

- [Wan 3.0 prompt library on APIKO](https://apiko.app/wan-3-0-prompts?utm_source=github&utm_medium=related&utm_campaign=awesome-wan-3.0-prompts)
- [Wan 3.0 text to video](https://apiko.app/models/wan3.0-text-to-video?utm_source=github&utm_medium=related&utm_campaign=awesome-wan-3.0-prompts)
- [Wan 3.0 image to video](https://apiko.app/models/wan3.0-image-to-video?utm_source=github&utm_medium=related&utm_campaign=awesome-wan-3.0-prompts)
- [Wan 3.0 reference to video](https://apiko.app/models/wan3.0-reference-video?utm_source=github&utm_medium=related&utm_campaign=awesome-wan-3.0-prompts)
- [Wan 3.0 API docs](https://apiko.app/docs/api-manual/video-series/wan3.0/wan3.0-overview?utm_source=github&utm_medium=related&utm_campaign=awesome-wan-3.0-prompts)
- [Wan 3.0 API price comparison](https://apiko.app/compare/wan-api-pricing?utm_source=github&utm_medium=related&utm_campaign=awesome-wan-3.0-prompts)
- [Code examples for the APIKO API](https://github.com/tong0619453646-dev/apiko-ai-api-examples)

<a id="license"></a>
## 📄 License and credits

The prompts and example videos come from Alibaba's [Wan 3.0 creator handbook](https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9) and belong to Alibaba; they are shared here for reference with the source credited. Translations, descriptions and the build scripts are released under [CC BY 4.0](LICENSE).

If this list saves you time, a ⭐ helps others find it.

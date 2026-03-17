export interface ProductDescription {
  hook: string;
  body: string;
  benefits: string[];
}

export const DESCRIPTIONS: Record<string, ProductDescription> = {
  '1': {
    hook: 'Your skin, but better — luminous, weightless, and deeply nourished.',
    body: 'The Glazing Milk is a feather-light liquid essence that melts effortlessly into skin, leaving a soft, dewy finish that lasts all day. Its silky texture absorbs instantly, delivering a surge of lasting hydration that plumps the skin from within. Wear it alone for a natural glass-skin effect, or layer it beneath your favourite serum and moisturiser to amplify every step of your routine.',
    benefits: ['Delivers an immediate dewy, glass-skin finish', 'Weightless formula absorbs without residue', 'Plumps and smooths the skin\'s surface', 'Suitable for all skin types including sensitive', 'Enhances the effectiveness of products layered on top'],
  },
  '5': {
    hook: 'A wave of hydration that quenches even the most parched skin.',
    body: 'Lightweight yet profoundly effective, the Hydra-Boost Essence floods skin with moisture the moment it touches your face. Its water-like texture glides on smoothly, instantly relieving tightness and dullness to reveal a complexion that feels soft, supple, and refreshed. Use it daily as the first step of your routine to set the foundation for lasting hydration.',
    benefits: ['Instantly relieves dryness and tightness', 'Restores softness and suppleness', 'Water-like texture for effortless absorption', 'Suitable for dehydrated and dry skin types', 'Prepares skin to absorb subsequent products'],
  },
  '6': {
    hook: 'Clarity and radiance, refined to their purest form.',
    body: 'This luminosity-focused essence works quietly but powerfully beneath the surface, visibly evening skin tone and reducing the appearance of pores with each use. Its lightweight, translucent texture sinks in seamlessly, leaving skin with a refined, porcelain-like clarity. Over time, dullness fades and a natural brightness takes its place — effortlessly.',
    benefits: ['Visibly evens and brightens skin tone', 'Minimises the appearance of pores', 'Lightweight, fast-absorbing texture', 'Refines skin\'s surface for a smoother look', 'Suitable for all skin types, including oily and combination'],
  },
  '7': {
    hook: 'Ancient ritual, modern radiance.',
    body: 'Inspired by centuries of luminous skin traditions, this essence delivers a refined glow rooted in the power of fermentation. Its silky, water-thin texture glides across skin with ease, infusing it with a natural radiance that builds beautifully over time. Each application feels like a ritual — calming, luxurious, and deeply nourishing — leaving skin visibly brighter and more youthful.',
    benefits: ['Delivers a natural, long-lasting glow', 'Lightweight and fast-absorbing', 'Smooths and refines skin texture', 'Supports the appearance of a more youthful complexion', 'Calming sensorial experience with every use'],
  },
  '8': {
    hook: 'Skin that feels renewed, lifted, and unmistakably refined.',
    body: 'Formulated for those who demand more from their skincare, this sophisticated essence targets the visible signs of ageing with a precision that feels effortless. Its velvety texture glides across the skin\'s surface, instantly plumping fine lines and restoring a firmness that feels almost sculptural. With consistent use, the complexion appears smoother, more defined, and radiantly youthful.',
    benefits: ['Visibly firms and plumps the skin', 'Reduces the appearance of fine lines', 'Supports a more youthful, lifted complexion', 'Velvety texture that absorbs without residue', 'Ideal for mature or ageing-concerned skin'],
  },
  '9': {
    hook: 'Calm, balanced skin — restored to its most comfortable state.',
    body: 'Designed for skin that needs a moment of peace, this soothing essence gently envelops the complexion in a blanket of calm. Its delicate, fluid texture soothes redness and sensitivity on contact, while gradually building the skin\'s resilience over time. Gentle enough for the most reactive of skin types, it restores balance and comfort with every single use.',
    benefits: ['Instantly soothes redness and irritation', 'Strengthens skin\'s natural barrier', 'Restores comfort to sensitive and reactive skin', 'Ultra-gentle formula, suitable for all sensitivities', 'Leaves skin feeling calm, balanced, and resilient'],
  },
  '10': {
    hook: 'Pure radiance, distilled into a single drop.',
    body: 'This luxurious essence is your shortcut to glowing, visibly transformed skin. Its rose-kissed formula delivers a warmth and luminosity that feels almost lit-from-within, smoothing uneven texture and gently fading the appearance of dark spots with continued use. The lightweight, aromatic experience turns your morning routine into a sensorial moment of indulgence.',
    benefits: ['Delivers a radiant, lit-from-within glow', 'Fades the appearance of dark spots over time', 'Smooths and perfects skin texture', 'Luxurious, sensorial application experience', 'Suitable for dull, uneven, or tired-looking skin'],
  },
  '11': {
    hook: 'Resilience and repair, elevated to an art form.',
    body: 'This cult-worthy essence is the ultimate in skin recovery. Its unique, silky-gel texture glides across the face like a second skin — deeply nourishing, repairing, and protecting all at once. Fine lines appear softened, blemish marks fade gradually, and the overall complexion takes on a smoother, more even appearance. A true multi-tasker for those who want everything from one elegant step.',
    benefits: ['Accelerates skin\'s natural repair process', 'Fades blemish marks and post-breakout discolouration', 'Softens fine lines and smooths skin texture', 'Creates a protective, nourishing veil over skin', 'Suitable for sensitive, ageing, and damaged skin'],
  },
  '2': {
    hook: 'Your skin\'s armour — rebuilt, restored, and resilient.',
    body: 'When skin feels compromised, tight, or reactive, the Barrier Restore Cream steps in as the ultimate remedy. Its rich yet non-greasy texture wraps the complexion in a protective cocoon, restoring balance and reinforcing the skin\'s natural defences. With every application, redness calms, moisture is locked in, and skin begins to feel deeply nourished and fortified from within.',
    benefits: ['Restores and reinforces the skin\'s natural barrier', 'Calms redness, tightness, and sensitivity', 'Rich texture that absorbs without heaviness', 'Provides long-lasting moisture retention', 'Suitable for compromised, dry, and sensitive skin'],
  },
  '12': {
    hook: 'Deeply nourishing comfort for skin that craves restoration.',
    body: 'The Ceramide Rich Moisturiser is a luxuriously dense, velvety cream that melts into skin like cashmere. It works to repair and reinforce the skin\'s protective layer, sealing in moisture and creating a smooth, refined surface that feels impossibly soft. Perfect for dry, dehydrated, or barrier-compromised skin, it delivers an enveloping richness that transforms the complexion overnight.',
    benefits: ['Deeply nourishes and conditions dry skin', 'Restores moisture balance and suppleness', 'Creates a smooth, refined skin surface', 'Seals in hydration for long-lasting comfort', 'Ideal for dry, mature, and sensitive skin types'],
  },
  '13': {
    hook: 'All the hydration, none of the weight.',
    body: 'This refreshing gel moisturiser is the answer for skin that wants hydration without heaviness. Its cooling, water-burst texture melts instantly on contact, flooding skin with moisture while leaving a perfectly mattified finish. Ideal for warmer climates or oilier skin types, it delivers a clean, comfortable, all-day hydration that feels like nothing at all.',
    benefits: ['Delivers instant, weightless hydration', 'Cooling, water-burst texture on application', 'Leaves a clean, shine-free finish', 'Fast-absorbing — perfect under makeup', 'Ideal for oily, combination, and normal skin'],
  },
  '14': {
    hook: 'Wake up to visibly transformed skin, every morning.',
    body: 'While you sleep, the Overnight Recovery Cream works tirelessly to restore, repair, and renew. Its sumptuous, cloud-like texture sinks into the skin overnight, delivering an intense surge of nourishment that works with the skin\'s natural regeneration cycle. By morning, fine lines appear softer, skin feels plumper, and the complexion glows with a well-rested radiance.',
    benefits: ['Intensely nourishes skin during sleep', 'Visibly reduces fine lines by morning', 'Supports skin\'s natural overnight repair cycle', 'Rich, luxurious texture that absorbs fully', 'Wakes up skin looking plump, rested, and radiant'],
  },
  '15': {
    hook: 'Radiance, restored. Luminosity, redefined.',
    body: 'This brightening cream is a celebration of glow. Its silky, lightweight texture delivers a potent dose of luminosity to the skin, visibly fading dark spots and uneven tone with consistent use. The result is a complexion that appears fresher, clearer, and genuinely radiant — as though lit from within. A daily essential for anyone who wants their skin to look as good as it feels.',
    benefits: ['Visibly brightens and evens skin tone', 'Fades dark spots and hyperpigmentation over time', 'Silky texture that absorbs effortlessly', 'Imparts a natural, lit-from-within radiance', 'Suitable for dull, uneven, and tired skin'],
  },
  '16': {
    hook: 'Age beautifully. Renew relentlessly.',
    body: 'The most sophisticated moisturiser in the Elara Beauty lineup, the Retinol Renewal Moisturiser combines the power of renewal with the comfort of a luxury cream. Its velvety texture delivers a transformative experience — smoothing the appearance of fine lines, refining skin texture, and restoring a youthful firmness that becomes more noticeable with every use.',
    benefits: ['Visibly reduces the appearance of fine lines and wrinkles', 'Firms and lifts the skin\'s overall appearance', 'Refines skin texture for a smooth, porcelain finish', 'Rich yet comfortable texture for nightly use', 'Results-driven formula for mature or ageing-concerned skin'],
  },
  '17': {
    hook: 'Instant plumpness. Lasting softness. Total comfort.',
    body: 'The Hydra-Plump Moisturiser delivers an immediate, visible plumping effect the moment it touches skin. Its bouncy, pillowy texture envelops the complexion in long-lasting hydration, filling in fine lines and restoring a youthful fullness that lasts all day. Indulgent yet fast-absorbing, it leaves skin looking dewy, smooth, and undeniably supple.',
    benefits: ['Instantly plumps and smooths the skin\'s surface', 'Provides all-day hydration and comfort', 'Visibly fills in fine lines and dehydration creases', 'Bouncy, pillowy texture for a luxurious experience', 'Suitable for dehydrated, dry, and mature skin'],
  },
  '18': {
    hook: 'Your skin, perfected — naturally.',
    body: 'The Skin Tint Moisture Veil is the effortless marriage of skincare and beauty. Its sheer, buildable coverage melts seamlessly into skin, evening out tone while delivering a surge of hydration that makes skin glow from the first application. Lightweight and breathable, it feels like wearing nothing — while looking like you woke up flawless.',
    benefits: ['Sheer, buildable coverage for a natural finish', 'Hydrates and protects skin throughout the day', 'Lightweight, breathable formula', 'Evens skin tone without masking natural texture', 'Suitable for all skin tones and types'],
  },
  '3': {
    hook: 'Softer, smoother lips — starting from the first application.',
    body: 'This ultra-nourishing lip treatment delivers a concentrated dose of comfort to dry, depleted lips. Its cushiony texture melts on contact, smoothing fine lip lines and restoring softness with every use. Wear it as the final step of your skincare routine or layer it beneath lip colour for a smooth, plumped canvas that holds beautifully.',
    benefits: ['Deeply nourishes and softens dry lips', 'Smooths the appearance of fine lip lines', 'Creates a plump, cushioned lip surface', 'Comfortable, non-sticky texture', 'Suitable for daily use as a lip treatment or primer'],
  },
  '19': {
    hook: 'Sleep your way to softer, healthier lips.',
    body: 'Formulated for an overnight transformation, this intensive lip mask works through the night to restore moisture, repair cracks, and leave lips visibly plumper by morning. Its thick, balm-like texture forms a protective seal over the lips, locking in nourishment and allowing skin to regenerate undisturbed. Wake up to lips that feel genuinely renewed.',
    benefits: ['Intensely repairs dry and cracked lips overnight', 'Locks in moisture with a protective seal', 'Visibly plumps lips by morning', 'Rich, comfortable texture that stays in place', 'Ideal as the final step of your evening routine'],
  },
  '20': {
    hook: 'A whisper of colour, a world of hydration.',
    body: 'Equal parts skincare and beauty, the Tinted Lip Balm delivers a sheer wash of natural colour while keeping lips perfectly moisturised all day. Its featherweight texture glides on effortlessly, leaving a soft, blurred finish that enhances the lips\' natural tone. A daily essential for effortlessly polished, healthy-looking lips.',
    benefits: ['Delivers sheer, natural-looking colour', 'Moisturises and protects throughout the day', 'Lightweight, non-sticky texture', 'Enhances lips\' natural tone and fullness', 'Perfect for everyday, no-makeup looks'],
  },
  '21': {
    hook: 'Visibly fuller lips, with a single swipe.',
    body: 'This sophisticated lip serum delivers an immediate plumping sensation that makes lips appear noticeably fuller with every application. Its glossy, lightweight formula smooths the lip\'s surface while delivering long-term care that gradually softens fine lines around the mouth. Wear it alone for a high-shine, plumped finish or layer it over any lip colour.',
    benefits: ['Creates an immediate plumping sensation', 'Visibly enhances lip fullness and definition', 'Smooths fine lines around the lip area', 'High-shine, glamorous finish', 'Suitable for daily use, alone or over colour'],
  },
  '22': {
    hook: 'Polish away dullness. Reveal your softest lips yet.',
    body: 'This gentle yet effective lip scrub buffs away dry, flaking skin to reveal a smoother, more receptive lip surface beneath. Its fine-textured formula feels indulgent in use — like a spa treatment for your lips — leaving them instantly softer, brighter, and perfectly prepped for treatment or colour. Use it before your lip mask for a truly transformative experience.',
    benefits: ['Gently removes dry, flaking skin from lips', 'Reveals smoother, softer lips immediately', 'Preps lips for better absorption of treatments', 'Indulgent, spa-like application experience', 'Suitable for use 2–3 times per week'],
  },
  '23': {
    hook: 'Glossy, gorgeous, and deeply nourishing — all at once.',
    body: 'The Nourishing Lip Oil is the modern lip treatment for those who want it all: shine, softness, and serious hydration in one sleek formula. Its lightweight oil texture glides across the lips in a single stroke, leaving a non-sticky, high-shine finish that makes lips look healthy and beautifully cared for. Comfortable to wear throughout the day, it\'s the effortless lip step you\'ll reach for every morning.',
    benefits: ['Delivers a non-sticky, high-shine finish', 'Deeply nourishes and softens lips throughout the day', 'Lightweight oil texture for comfortable all-day wear', 'Enhances natural lip colour and fullness', 'Suitable for daily use, alone or layered over colour'],
  },
  '24': {
    hook: 'Protection meets luxury — for lips that stay beautiful longer.',
    body: 'The SPF Lip Shield is the non-negotiable step your lip routine has been missing. Its smooth, invisible formula shields lips from environmental damage while keeping them comfortably moisturised all day. Weightless and non-greasy, it layers beautifully under any lip colour or gloss, making it the perfect base for a complete lip routine.',
    benefits: ['Protects lips from environmental and sun damage', 'Keeps lips comfortable and moisturised all day', 'Invisible, weightless formula', 'Layers seamlessly under lip colour', 'A daily essential for long-term lip health'],
  },
  '25': {
    hook: 'Decadently rich. Visibly plumper. Irresistibly soft.',
    body: 'The most luxurious step in your lip routine, the Collagen Lip Butter wraps lips in an intensely nourishing treatment that targets fine lip lines, dryness, and loss of definition all at once. Its rich, buttery texture melts on contact — never waxy, never heavy — leaving lips with a pillowy softness and visible plumpness that speaks for itself.',
    benefits: ['Visibly plumps and defines the lip area', 'Smooths fine lines around and on the lips', 'Rich, buttery texture that melts effortlessly', 'Provides long-lasting moisture and softness', 'Ideal for use morning and night as a luxury lip treatment'],
  },
  '4': {
    hook: 'Reveal your glow — one cleanse at a time.',
    body: 'This brightening, enzyme-powered cleanser dissolves the day\'s impurities while gently resurfacing the skin\'s surface for a visibly smoother, more luminous complexion. Its refreshing gel texture transforms into a light foam upon contact with water, leaving skin thoroughly cleansed without ever feeling stripped. A sensorial treat that makes cleansing feel like a ritual.',
    benefits: ['Dissolves impurities and excess oils effectively', 'Gently resurfacing for a smoother skin surface', 'Leaves skin clean, bright, and refreshed', 'Refreshing, tropical sensorial experience', 'Suitable for normal, oily, and combination skin'],
  },
  '26': {
    hook: 'The purest start to every skin ritual.',
    body: 'Soft, airy, and unmistakably luxurious, the Gentle Foam Cleanser removes every trace of impurity without disturbing the skin\'s delicate balance. Its pillowy foam texture glides across the face, cleansing deeply yet gently — making it the ideal choice for sensitive, reactive, or compromised skin. After rinsing, skin feels calm, clean, and genuinely comfortable.',
    benefits: ['Thoroughly cleanses without stripping moisture', 'Gentle enough for sensitive and reactive skin', 'Maintains skin\'s natural pH balance', 'Leaves skin feeling calm, soft, and refreshed', 'Suitable for daily morning and evening use'],
  },
  '27': {
    hook: 'Effortless cleansing. Zero compromise.',
    body: 'A cult staple reimagined with Elara Beauty\'s signature luxury, this micellar water removes makeup, sunscreen, and daily impurities in moments — no rinsing required. Its ultra-pure, water-light formula is so gentle it can be used around the eyes, yet so effective it leaves skin perfectly clean with a single sweep. The most effortless step in any skincare routine.',
    benefits: ['Removes makeup and impurities without rinsing', 'Gentle enough for use around the eyes', 'Leaves no residue or greasy feel', 'Suitable for all skin types including sensitive', 'Perfect as a first cleanse or travel essential'],
  },
  '28': {
    hook: 'The art of melting away the day.',
    body: 'This transformative cleansing oil starts as a silky, aromatic oil that dissolves even the most stubborn makeup and SPF on contact — then emulsifies into a gentle milk with the addition of water, rinsing away cleanly without a trace. The experience is deeply satisfying: skin feels thoroughly cleansed, balanced, and perfectly prepped for the next steps of your routine.',
    benefits: ['Dissolves makeup, SPF, and daily impurities effortlessly', 'Transforms from oil to milk upon contact with water', 'Rinses cleanly without residue', 'Leaves skin balanced, soft, and nourished', 'Suitable for all skin types, including dry and sensitive'],
  },
  '29': {
    hook: 'Resurface. Refine. Reveal.',
    body: 'This results-driven cleanser goes beyond surface cleansing to gently renew the skin with each use. Its smooth, creamy texture delivers a mild exfoliating action that dissolves dead skin cells, unclogs pores, and reveals a visibly brighter, more refined complexion without the harshness of physical scrubs. The ultimate elevated cleanse for those who want more from their daily routine.',
    benefits: ['Gently exfoliates to reveal brighter, smoother skin', 'Unclogs pores for a refined, clarified complexion', 'Creamy, non-abrasive texture', 'Gradually improves skin tone and texture with regular use', 'Suitable for normal, dull, and combination skin'],
  },
  '30': {
    hook: 'Cleanse and care — in a single, luxurious step.',
    body: 'Designed for skin that craves comfort, this creamy, cushion-textured cleanser nourishes as it cleans. It dissolves impurities gently while leaving behind a veil of softness that makes skin feel conditioned, not stripped. Rich and indulgent in texture yet perfectly balanced in effect, it\'s the ideal cleanser for dry, dehydrated, or winter skin.',
    benefits: ['Cleanses while actively nourishing the skin', 'Rich, cushion-like texture that feels luxurious in use', 'Leaves skin soft, smooth, and hydrated post-cleanse', 'Never strips or compromises the skin barrier', 'Ideal for dry, dehydrated, and sensitive skin types'],
  },
  '31': {
    hook: 'Deep-clean clarity, elevated.',
    body: 'This sophisticated clay cleanser draws out impurities from deep within the pores, leaving the skin looking visibly clearer, more refined, and beautifully matte. Its smooth, velvety texture applies like a dream and rinses away effortlessly, taking congestion and excess oil with it. The ultimate detox cleanse for skin that wants to breathe.',
    benefits: ['Deep-cleanses and detoxifies the pores', 'Reduces shine and controls excess oil', 'Leaves skin visibly clearer and more refined', 'Smooth, velvety texture for effortless application', 'Suitable for oily, combination, and congested skin'],
  },
  '32': {
    hook: 'Perfectly clean. Perfectly balanced.',
    body: 'Light, refreshing, and expertly formulated, the Balancing Gel Cleanser removes impurities and excess oil while actively working to maintain the skin\'s natural equilibrium. Its transparent gel texture lathers gently into a soft foam, cleansing deeply without over-drying or disrupting the skin\'s protective barrier. The result is a complexion that feels genuinely balanced and refreshed.',
    benefits: ['Thoroughly cleanses without disrupting skin\'s balance', 'Controls excess oil while maintaining hydration', 'Gentle lather that\'s effective yet non-stripping', 'Leaves skin feeling fresh, clean, and comfortable', 'Ideal for combination, sensitive, and normal skin types'],
  },
  '33': {
    hook: 'The eye area, visibly lifted and luminously refreshed.',
    body: 'Cooling, featherlight, and instantly reviving, the Collagen Eye Gel is the first step to a more youthful, wide-awake eye area. Its silky gel texture glides across the delicate skin beneath the eyes, absorbing instantly to firm, plump, and smooth the appearance of fine lines and puffiness. A morning essential for eyes that look as rested as they feel.',
    benefits: ['Instantly refreshes and revives the eye area', 'Visibly reduces puffiness and tired-looking eyes', 'Firms and smooths fine lines around the eyes', 'Cooling, lightweight gel texture absorbs effortlessly', 'Suitable for morning and evening use'],
  },
  '34': {
    hook: 'Wake up your eyes — instantly.',
    body: 'Formulated for mornings when your eyes tell a different story than the rest of you, this targeted eye serum delivers an immediate brightening and depuffing effect that makes the eye area look visibly more awake. Its lightweight dropper formula sinks in rapidly, targeting dark circles, puffiness, and fine lines with remarkable precision. One drop is all it takes.',
    benefits: ['Instantly depuffs and brightens the eye area', 'Reduces the appearance of dark circles', 'Targeted dropper application for precise use', 'Lightweight formula that absorbs without residue', 'Results visible from the very first application'],
  },
  '35': {
    hook: 'Light, lifted, luminous — eyes that speak for themselves.',
    body: 'This award-worthy eye cream targets darkness, dullness, and dehydration around the delicate eye area with a precision that feels almost effortless. Its rich yet fast-absorbing texture sinks in smoothly, delivering a brightening veil that makes the eye area look instantly more luminous. With consistent use, dark circles fade, skin firms, and the eyes take on a refreshed, youthful clarity.',
    benefits: ['Visibly brightens and illuminates the eye area', 'Reduces the appearance of dark circles over time', 'Firms and smooths the delicate eye contour', 'Rich texture that absorbs without feeling heavy', 'Suitable for morning and evening use'],
  },
  '36': {
    hook: 'A five-minute luxury ritual your eyes deserve.',
    body: 'These gold-infused eye patches are the ultimate indulgence for a tired, puffy eye area. Each box contains 16 patches — 8 pairs of under-eye treatments ready to use whenever your eyes need it most. In just five minutes, they visibly reduce swelling, brighten dark circles, and leave the under-eye area looking smoother and more awake. Whether used before an event or as a weekly ritual, the effect is immediate, visible, and deeply satisfying.',
    benefits: ['16 patches included (8 pairs) per box', 'Visibly reduces puffiness in minutes', 'Brightens and refreshes the under-eye area', 'Instantly smooths and plumps the skin beneath the eyes', 'Luxurious gold-foil finish for an elevated ritual', 'Perfect for pre-event prep or weekly self-care'],
  },
  '37': {
    hook: 'Turn back time — one eye at a time.',
    body: 'The most targeted anti-ageing treatment in the Elara Beauty eye care collection, this precision formula addresses fine lines, crow\'s feet, and loss of firmness around the eye area with remarkable effectiveness. Its sophisticated, velvety texture glides on with ease, delivering visible results that accumulate beautifully over time. For eyes that defy the years.',
    benefits: ['Visibly reduces fine lines and crow\'s feet', 'Firms and lifts the skin around the eye area', 'Smooths and refines the delicate eye contour', 'Velvety, comfortable texture for nightly use', 'Long-term results that improve with consistent use'],
  },
  '38': {
    hook: 'An oasis of hydration for your most delicate skin.',
    body: 'These ultra-nourishing eye masks deliver an instant surge of moisture to the under-eye area, plumping, brightening, and smoothing in a single use. Their gel-like texture adheres perfectly to the skin, allowing the treatment to absorb fully while you take a well-deserved moment of pause. The result is an eye area that looks refreshed, dewy, and visibly revived.',
    benefits: ['Instantly hydrates and plumps the under-eye area', 'Brightens and refreshes tired, dehydrated eyes', 'Smooths the appearance of fine dehydration lines', 'Gentle, comfortable formula for all skin types', 'Ideal as a weekly treatment or pre-event essential'],
  },
  '39': {
    hook: 'Brighten. Correct. Conceal — from the inside out.',
    body: 'Designed specifically for the appearance of persistent dark circles, this targeted corrector works beneath the surface to visibly lighten and brighten the under-eye area over time. Its silky, precise formula blends effortlessly into the skin, creating an immediate brightening effect while working long-term to address discolouration at its source. Confidence in a single, elegant stroke.',
    benefits: ['Immediately brightens and corrects the under-eye area', 'Targets the appearance of persistent dark circles', 'Silky, blendable texture for precise application', 'Suitable for all skin tones', 'Long-term brightening results with consistent use'],
  },
  '40': {
    hook: 'Sculpted. Defined. Visibly lifted.',
    body: 'The most prestige step in the Elara Beauty eye care collection, the Lifting Eye Contour is a transformative treatment designed to redefine and sculpt the entire eye area. Its opulent, silky cream melts into skin on contact, delivering an immediate tightening sensation that visibly lifts and firms the eye contour. Fine lines smooth, skin firms, and the eyes take on a beautifully sculpted, youthful definition.',
    benefits: ['Visibly lifts and firms the eye contour', 'Delivers an immediate tightening sensation', 'Smooths fine lines and firms skin around the eyes', 'Opulent, silky texture that absorbs effortlessly', 'The ultimate prestige eye treatment for visible, lasting results'],
  },
};

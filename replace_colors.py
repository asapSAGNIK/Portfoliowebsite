import re

with open("d:/Portfoliowebsite/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace global background
content = re.sub(
    r'style=\{\{ backgroundColor: isPlaying \? "transparent" : "#FFF8DE" \}\}',
    'style={{ backgroundColor: "#000000" }}',
    content
)

# Replace profile image border/shadow
content = re.sub(
    r'borderColor: "#FFF2C6",\s*boxShadow:\s*"0 25px 50px -12px rgba\(255, 242, 198, 0\.25\), 0 0 0 1px rgba\(255, 242, 198, 0\.3\)",',
    'borderColor: "#3E432E",\n                    boxShadow: "0 25px 50px -12px rgba(167, 209, 41, 0.15), 0 0 0 1px rgba(62, 67, 46, 0.5)",',
    content
)

# Replace Title color
content = re.sub(
    r'color: isPlaying \? "#fde047" : "#3A5FFF"',
    'color: "#A7D129"',
    content
)

# Replace Info Block Box styling
content = re.sub(
    r'bg-\[\#0a0a0a\] text-gray-300',
    'bg-[#000000] border border-[#3E432E] text-[#A7D129]',
    content
)

# Replace Info Block icon backgrounds
content = re.sub(
    r'bg-\[\#111\] rounded-full border border-gray-800',
    'bg-[#3E432E] rounded-full border border-[#616F39]',
    content
)

# Replace Info Block icon colors
content = re.sub(
    r'text-gray-400',
    'text-[#A7D129]',
    content
)

# Replace hover transitions in info block
content = re.sub(
    r'hover:text-white',
    'hover:text-[#616F39]',
    content
)

# Replace Summary Section Text Container color
content = re.sub(
    r'className=\{`space-y-1\.5 text-sm text-left mb-8 md:mb-10 \$\{isPlaying \? "text-white" : ""\}`\}',
    'className="space-y-1.5 text-sm text-left mb-8 md:mb-10 text-[#616F39]"',
    content
)
content = re.sub(
    r'color: isPlaying \? undefined : "#6B8CE8"',
    'color: "#616F39"',
    content
)

# Replace Summary Bullets
content = re.sub(
    r'className=\{`inline-block w-2 text-center flex-shrink-0 \$\{isPlaying \? "text-yellow-500" : ""\}`\}\s*style=\{\{ color: isPlaying \? undefined : "#3A5FFF" \}\}',
    'className="inline-block w-2 text-center flex-shrink-0 text-[#A7D129]"',
    content
)

# Replace specific span texts in summary
content = re.sub(
    r'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400" : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700',
    'bg-gradient-to-r from-[#616F39] via-[#A7D129] to-[#616F39]" : "bg-gradient-to-r from-[#616F39] via-[#A7D129] to-[#616F39]',
    content
)

# Resume's Here bullet
content = re.sub(
    r'className=\{`underline underline-offset-2 decoration-1 transition-all duration-200 group-hover:decoration-2 \$\{isPlaying \? "decoration-yellow-400/60 group-hover:text-yellow-300" : "decoration-blue-400/60 group-hover:text-\[\#3A5FFF\]"\}`\}',
    'className="underline underline-offset-2 decoration-1 transition-all duration-200 group-hover:decoration-2 decoration-[#616F39] text-[#A7D129] group-hover:text-[#616F39]"',
    content
)

# WorkEx and Projects Section Headings
content = re.sub(
    r'className=\{`text-2xl font-bold mb-[34] \$\{isPlaying \? "text-yellow-500" : ""\}`\}\s*style=\{\{\s*fontFamily: "Hoover, sans-serif",\s*color: isPlaying \? undefined : "#3A5FFF",\s*\}\}',
    'className="text-2xl font-bold mb-3 text-[#A7D129]"\n                style={{ fontFamily: "Hoover, sans-serif" }}',
    content
)

# WorkEx items
content = re.sub(
    r'className=\{`group flex flex-col cursor-pointer transition-all duration-200 hover:translate-x-1 p-4 rounded-xl border \$\{isPlaying \? "border-transparent hover:border-white/10 hover:bg-white/5" : "border-transparent hover:border-blue-200/60 hover:bg-\[\#FFF2C6\]/30"\}`\}',
    'className="group flex flex-col cursor-pointer transition-all duration-200 hover:translate-x-1 p-4 rounded-xl border border-transparent hover:border-[#616F39] hover:bg-[#3E432E]"',
    content
)
content = re.sub(
    r'className=\{`text-lg font-bold transition-colors \$\{isPlaying \? "text-white group-hover:text-yellow-400" : "group-hover:text-\[\#3A5FFF\]"\}`\}\s*style=\{\{\s*fontFamily: "Hoover, sans-serif",\s*color: isPlaying \? undefined : "#3A5FFF",\s*\}\}',
    'className="text-lg font-bold transition-colors text-[#A7D129] group-hover:text-[#616F39]"\n                        style={{ fontFamily: "Hoover, sans-serif" }}',
    content
)
content = re.sub(
    r'className=\{`w-4 h-4 transition-all opacity-60 group-hover:opacity-100 group-hover:translate-x-0\.5 group-hover:-translate-y-0\.5 \$\{isPlaying \? "text-yellow-400" : "text-\[\#3A5FFF\]"\}`\}',
    'className="w-4 h-4 transition-all opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#A7D129]"',
    content
)
content = re.sub(
    r'className=\{`text-xs ml-auto \$\{isPlaying \? "text-muted-foreground" : ""\}`\}',
    'className="text-xs ml-auto text-[#616F39]"',
    content
)
content = re.sub(
    r'className=\{`text-sm mt-1 leading-relaxed \$\{isPlaying \? "text-gray-300" : ""\}`\}',
    'className="text-sm mt-1 leading-relaxed text-[#A7D129]"',
    content
)

# Project items
content = re.sub(
    r'className=\{`group flex flex-col rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl \$\{isPlaying \? "border-gray-700/50 hover:border-gray-500/60" : "border-gray-300/60 hover:border-blue-300/80"\}`\}\s*style=\{\{\s*backgroundColor: isPlaying\s*\?\s*"rgba\(255,255,255,0\.04\)"\s*:\s*"#FFF8DE",\s*\}\}\s*onMouseEnter=\{\(e\) => \{\s*if \(\!isPlaying\) \{\s*e\.currentTarget\.style\.backgroundColor = "#FFF2C6";\s*\}\s*\}\}\s*onMouseLeave=\{\(e\) => \{\s*if \(\!isPlaying\) \{\s*e\.currentTarget\.style\.backgroundColor = "#FFF8DE";\s*\}\s*\}\}',
    'className="group flex flex-col rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border-[#3E432E] hover:border-[#616F39] bg-[#000000] hover:bg-[#3E432E]"',
    content
)

content = re.sub(
    r'className=\{`absolute inset-x-0 bottom-0 h-10 \$\{isPlaying \? "bg-gradient-to-t from-black/40 to-transparent" : "bg-gradient-to-t from-\[\#FFF8DE\]/10 to-transparent"\}`\}',
    'className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#000000]/80 to-transparent"',
    content
)
content = re.sub(
    r'className=\{`text-base font-bold leading-snug mb-3 \$\{isPlaying \? "text-yellow-300" : ""\}`\}\s*style=\{\{\s*fontFamily: "Hoover, sans-serif",\s*color: isPlaying \? undefined : "#3A5FFF",\s*\}\}',
    'className="text-base font-bold leading-snug mb-3 text-[#A7D129]"\n                        style={{ fontFamily: "Hoover, sans-serif" }}',
    content
)

# Github link note
content = re.sub(
    r'className=\{`text-center text-sm mt-6 \$\{isPlaying \? "text-muted-foreground" : ""\}`\}',
    'className="text-center text-sm mt-6 text-[#616F39]"',
    content
)
content = re.sub(
    r'className="underline underline-offset-2 hover:opacity-70"',
    'className="underline underline-offset-2 text-[#A7D129] hover:text-[#616F39]"',
    content
)

# Footer
content = re.sub(
    r'className=\{`max-w-2xl mx-auto px-4 sm:px-6 flex justify-between text-sm \$\{isPlaying \? "text-muted-foreground" : ""\}`\}',
    'className="max-w-2xl mx-auto px-4 sm:px-6 flex justify-between text-sm text-[#616F39]"',
    content
)
content = re.sub(
    r'border-border/40',
    'border-[#3E432E]',
    content
)

with open("d:/Portfoliowebsite/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")

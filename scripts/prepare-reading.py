"""Run locally to generate reading images; source PDFs are kept outside the published output."""
from pathlib import Path
import json
import pypdfium2 as pdfium
from pypdf import PdfReader
root=Path(__file__).resolve().parents[1]
p=root/'js/data.js';s=p.read_text();data=json.loads(s[s.index('{'):s.rindex('}')+1])
for item in data['critiques']:
    if item.get('format')!='pdf':continue
    source=root/'documents/critiques'/Path(item.get('sourceFile',item['url'])).name
    item['sourceFile']=source.name
    pdf=pdfium.PdfDocument(str(source));reader=PdfReader(source);pages=[]
    directory=root/'images';directory.mkdir(parents=True,exist_ok=True)
    for number,page in enumerate(pdf):
        output=directory/f"reading-{item['id']}-page-{number+1}.webp"
        page.render(scale=1600/page.get_width()).to_pil().convert('RGB').save(output,'WEBP',quality=88)
        pages.append({'image':str(output.relative_to(root)),'text':(reader.pages[number].extract_text() or '').replace('\ufffd',' ')})
    item['pages']=pages;item['url']='index.html?page=reading&id='+item['id']
p.write_text('// 콘텐츠 수정: exhibitions는 전시, critiques는 비평 목록입니다.\nwindow.PORTFOLIO = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n')
print('Prepared reading images for all PDF critiques.')

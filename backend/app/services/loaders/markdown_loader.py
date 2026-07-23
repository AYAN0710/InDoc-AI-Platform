import markdown
from bs4 import BeautifulSoup

def extract_markdown_text(file_path:str)->str:
    with open(file_path,"r",encoding="utf-8") as file:
        markdown_content=file.read()
    html=markdown.markdown(markdown_content)
    soup=BeautifulSoup(html,"html.parser")
    return soup.get_text(separator="\n")

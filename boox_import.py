"""
Boox Import Script - Phase 1, Haeppchen 1.1
==========================================

Scannt PDFs und PNGs aus Boox-Ordnern und erstellt Metadaten-Files.

Quellen:
- PDFs: E:/Neuanfang/b_bian/ya_Toughs/
- PNGs: E:/Neuanfang/b_bian/bi_Logs/2025/

Ausgabe:
- YAML-Files in: E:/Neuanfang/a_yang/153_H2me/boox_metadata/
"""

import os
import yaml
from pathlib import Path
from datetime import datetime
import re

# Konfiguration
NOTIZEN_PATH = Path(r"E:\Neuanfang\b_bian\ya_Toughs")
KALENDER_PATH = Path(r"E:\Neuanfang\b_bian\bi_Logs\2025")
METADATA_PATH = Path(r"E:\Neuanfang\a_yang\153_H2me\boox_metadata")

# Kategorie-Mapping (aus Filename-Pattern)
CATEGORY_MAP = {
    'ya': 'yang',
    'bi': 'bian',
    'yi': 'yin'
}

def ensure_metadata_folder():
    """Erstellt Metadata-Ordner falls nicht vorhanden."""
    METADATA_PATH.mkdir(parents=True, exist_ok=True)
    print(f"OK Metadata-Ordner bereit: {METADATA_PATH}")

def extract_pdf_metadata(pdf_path):
    """
    Extrahiert Metadaten aus PDF-Filename und -Pfad.
    
    Pattern: ya_Toughs/ordner/ordner.pdf
    Beispiel: ya_H2_me/ya_H2_me.pdf
    """
    path_obj = Path(pdf_path)
    filename = path_obj.stem  # ohne .pdf
    folder_name = path_obj.parent.name
    
    metadata = {
        'type': 'notizen',
        'filename': path_obj.name,
        'folder': folder_name,
        'full_path': str(pdf_path),
        'size_mb': round(path_obj.stat().st_size / (1024*1024), 2),
        'created': datetime.fromtimestamp(path_obj.stat().st_ctime).isoformat(),
        'modified': datetime.fromtimestamp(path_obj.stat().st_mtime).isoformat(),
    }
    
    # Kategorie extrahieren (ya/bi/yi)
    category_match = re.match(r'([a-z]{2})_', filename)
    if category_match:
        cat_code = category_match.group(1)
        metadata['category'] = CATEGORY_MAP.get(cat_code, cat_code)
        metadata['category_code'] = cat_code
    
    # Thema extrahieren (nach Kategorie)
    theme_match = re.match(r'[a-z]{2}_(.+)', filename)
    if theme_match:
        metadata['theme'] = theme_match.group(1)
    
    # Wochen-Pattern erkennen (YYYY-MM_wWW_kategorie)
    week_match = re.match(r'(\d{4})-(\d{2})_w(\d{2})_(.+)', filename)
    if week_match:
        year, month, week, cat = week_match.groups()
        metadata['year'] = int(year)
        metadata['month'] = int(month)
        metadata['week'] = int(week)
        metadata['pattern'] = 'weekly'
    
    # Projekt-Nummern suchen (153_, 610_, etc.)
    project_nums = re.findall(r'(\d{3})_', filename)
    if project_nums:
        metadata['project_refs'] = project_nums
    
    return metadata

def extract_png_metadata(png_path):
    """
    Extrahiert Metadaten aus PNG-Filename und -Pfad.
    
    Pattern: bi_Logs/2025/YYYYMMDD/YYYYMMDD/YYYYMMDD_Nr.png
    Beispiel: 20251024/20251024/20251024_1.png
    """
    path_obj = Path(png_path)
    filename = path_obj.stem  # ohne .png
    
    metadata = {
        'type': 'kalender',
        'filename': path_obj.name,
        'full_path': str(png_path),
        'size_kb': round(path_obj.stat().st_size / 1024, 2),
        'created': datetime.fromtimestamp(path_obj.stat().st_ctime).isoformat(),
        'modified': datetime.fromtimestamp(path_obj.stat().st_mtime).isoformat(),
    }
    
    # Datum + Seiten-Nummer extrahieren (YYYYMMDD_Nr)
    date_match = re.match(r'(\d{4})(\d{2})(\d{2})_(\d+)', filename)
    if date_match:
        year, month, day, page = date_match.groups()
        metadata['date'] = f"{year}-{month}-{day}"
        metadata['year'] = int(year)
        metadata['month'] = int(month)
        metadata['day'] = int(day)
        metadata['page'] = int(page)
    
    return metadata

def scan_pdfs():
    """Scannt alle PDFs in ya_Toughs (mit doppelt verschachtelten Ordnern)."""
    pdfs_found = []
    
    if not NOTIZEN_PATH.exists():
        print(f"WARNUNG: Notizen-Pfad nicht gefunden: {NOTIZEN_PATH}")
        return pdfs_found
    
    print(f"\nPDF Scanne PDFs in: {NOTIZEN_PATH}")
    
    for folder in os.listdir(NOTIZEN_PATH):
        folder_path = NOTIZEN_PATH / folder
        
        # Nur Ordner, keine Files
        if not folder_path.is_dir():
            continue
        
        # Variante 1: Einfach verschachtelt - ordner/ordner.pdf
        pdf_file_simple = folder_path / f"{folder}.pdf"
        if pdf_file_simple.exists():
            pdfs_found.append(str(pdf_file_simple))
            print(f"  OK {folder}.pdf")
            continue
        
        # Variante 2: Doppelt verschachtelt - ordner/ordner/ordner.pdf
        inner_folder = folder_path / folder
        if inner_folder.exists():
            pdf_file_double = inner_folder / f"{folder}.pdf"
            if pdf_file_double.exists():
                pdfs_found.append(str(pdf_file_double))
                print(f"  OK {folder}.pdf (doppelt verschachtelt)")
    
    print(f"\n  Gesamt: {len(pdfs_found)} PDFs gefunden")
    return pdfs_found

def scan_pngs():
    """Scannt alle PNGs in bi_Logs/2025 (mit verschiedenen Verschachtelungen)."""
    pngs_found = []
    
    if not KALENDER_PATH.exists():
        print(f"WARNUNG: Kalender-Pfad nicht gefunden: {KALENDER_PATH}")
        return pngs_found
    
    print(f"\nPNG Scanne PNGs in: {KALENDER_PATH}")
    
    for date_folder in os.listdir(KALENDER_PATH):
        date_path = KALENDER_PATH / date_folder
        
        # Nur Ordner (YYYYMMDD)
        if not date_path.is_dir():
            continue
        
        # Variante 1: Direkt im Datums-Ordner - 2025/20251024/20251024_1.png
        for png_file in os.listdir(date_path):
            if png_file.endswith('.png'):
                full_path = date_path / png_file
                if full_path.is_file():
                    pngs_found.append(str(full_path))
        
        # Variante 2: Doppelt verschachtelt - 2025/20251024/20251024/20251024_1.png
        inner_folder = date_path / date_folder
        if inner_folder.exists() and inner_folder.is_dir():
            for png_file in os.listdir(inner_folder):
                if png_file.endswith('.png'):
                    full_path = inner_folder / png_file
                    if full_path.is_file():
                        pngs_found.append(str(full_path))
    
    print(f"  Gesamt: {len(pngs_found)} PNGs gefunden")
    return pngs_found

def create_metadata_yaml(file_path, metadata):
    """Erstellt YAML-File fuer ein PDF oder PNG."""
    path_obj = Path(file_path)
    
    # YAML-Filename basierend auf Original
    yaml_name = f"{path_obj.stem}.meta.yaml"
    yaml_path = METADATA_PATH / yaml_name
    
    # Zusaetzliche Import-Infos
    metadata['imported'] = datetime.now().isoformat()
    metadata['import_script'] = 'boox_import.py v1.0'
    
    # YAML schreiben
    with open(yaml_path, 'w', encoding='utf-8') as f:
        yaml.dump(metadata, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
    
    return str(yaml_path)

def main():
    """Hauptfunktion - fuehrt kompletten Import durch."""
    print("=" * 60)
    print("Boox Import Script - Phase 1, Haeppchen 1.1")
    print("=" * 60)
    
    # 1. Metadata-Ordner vorbereiten
    ensure_metadata_folder()
    
    # 2. PDFs scannen
    pdfs = scan_pdfs()
    
    # 3. PNGs scannen
    pngs = scan_pngs()
    
    # 4. Metadaten erstellen
    print(f"\nDOC Erstelle Metadaten-Files...")
    
    pdf_count = 0
    for pdf_path in pdfs:
        metadata = extract_pdf_metadata(pdf_path)
        yaml_path = create_metadata_yaml(pdf_path, metadata)
        pdf_count += 1
        if pdf_count <= 3:  # Erste 3 zeigen
            print(f"  OK {Path(yaml_path).name}")
    
    if pdf_count > 3:
        print(f"  ... und {pdf_count - 3} weitere PDFs")
    
    png_count = 0
    for png_path in pngs:
        metadata = extract_png_metadata(png_path)
        yaml_path = create_metadata_yaml(png_path, metadata)
        png_count += 1
    
    print(f"  OK {png_count} Kalender-PNGs")
    
    # 5. Zusammenfassung
    print("\n" + "=" * 60)
    print("Import abgeschlossen!")
    print("=" * 60)
    print(f"PDF PDFs:  {len(pdfs)}")
    print(f"PNG PNGs:  {len(pngs)}")
    print(f"FOLDER Metadata-Files erstellt: {len(pdfs) + len(pngs)}")
    print(f"FOLDER Speicherort: {METADATA_PATH}")
    print("=" * 60)

if __name__ == "__main__":
    main()

import pandas as pd
import json
from pathlib import Path

excel_file = r"data.xlsx"
output_file = r"web\data.json"

df = pd.read_excel(excel_file)

df.fillna("", inplace=True)

panitia_list = []
for _, row in df.iterrows():
    panitia_list.append({
        "kode": row["KODE"],
        "nama": row["NAMA LENGKAP"],
        "divisi": row["DIVISI"],
        "divisi_folder": row["DIVISI FOLDER"],
        "foto_path": row["FOTO PATH"],
        "size_kb": int(row["SIZE KB"]) if pd.notna(row["SIZE KB"]) else 0,
        "pesan": row["PESAN"]
    })

output_data = {
    "panitia": panitia_list
}

Path(output_file).parent.mkdir(parents=True, exist_ok=True)

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"Done! {len(panitia_list)} panitia saved to {output_file}")
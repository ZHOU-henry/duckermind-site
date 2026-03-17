#!/usr/bin/env python3

import csv
import html
import io
import json
import math
import os
import re
import urllib.request


PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUTPUT_PATH = os.path.join(
    PROJECT_ROOT, "site", "assets", "data", "noesis-observatory.json"
)
CACHE_DIR = os.path.join(PROJECT_ROOT, "site", "assets", "data", "_source_cache")

AI_VIBRANCY_URL = (
    "https://d3i91vx6n7fixv.cloudfront.net/data/full_data_09.24.25.csv"
)
ENERGY_URLS = {
    "electricity_generation": "https://ourworldindata.org/grapher/electricity-generation.csv?csvType=filtered",
    "low_carbon_electricity": "https://ourworldindata.org/grapher/low-carbon-electricity.csv?csvType=filtered",
    "low_carbon_share_elec": "https://ourworldindata.org/grapher/share-electricity-low-carbon.csv?csvType=filtered",
}
AWS_URL = "https://aws.amazon.com/about-aws/global-infrastructure/"
AZURE_URL = "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/"
ALIBABA_URL = "https://www.alibabacloud.com/en/global-locations"


COUNTRIES = {
    "United States": {
        "iso3": "USA",
        "lat": 39.8,
        "lng": -98.6,
        "anchors": [
            [37.77, -122.42],
            [47.61, -122.33],
            [32.78, -96.8],
            [39.04, -77.49],
            [41.88, -87.63],
        ],
    },
    "China": {
        "iso3": "CHN",
        "lat": 35.9,
        "lng": 104.2,
        "anchors": [
            [39.9, 116.4],
            [31.23, 121.47],
            [22.54, 114.06],
            [30.27, 120.15],
            [30.67, 104.06],
        ],
    },
    "United Kingdom": {
        "iso3": "GBR",
        "lat": 54.5,
        "lng": -2.2,
        "anchors": [[51.51, -0.13], [52.2, 0.12], [53.48, -2.24]],
    },
    "Germany": {
        "iso3": "DEU",
        "lat": 51.2,
        "lng": 10.4,
        "anchors": [[50.11, 8.68], [52.52, 13.4], [48.14, 11.58]],
    },
    "France": {
        "iso3": "FRA",
        "lat": 46.2,
        "lng": 2.2,
        "anchors": [[48.86, 2.35], [43.3, 5.37], [45.76, 4.84]],
    },
    "Canada": {
        "iso3": "CAN",
        "lat": 56.1,
        "lng": -106.3,
        "anchors": [[43.65, -79.38], [45.5, -73.57], [51.05, -114.07]],
    },
    "Japan": {
        "iso3": "JPN",
        "lat": 36.2,
        "lng": 138.2,
        "anchors": [[35.68, 139.76], [34.69, 135.5], [35.18, 136.91]],
    },
    "South Korea": {
        "iso3": "KOR",
        "lat": 36.4,
        "lng": 127.9,
        "anchors": [[37.56, 126.98], [36.35, 127.38], [35.18, 129.08]],
    },
    "India": {
        "iso3": "IND",
        "lat": 22.9,
        "lng": 79.0,
        "anchors": [
            [12.97, 77.59],
            [19.08, 72.88],
            [17.38, 78.48],
            [28.61, 77.21],
            [13.08, 80.27],
        ],
    },
    "Singapore": {
        "iso3": "SGP",
        "lat": 1.35,
        "lng": 103.82,
        "anchors": [[1.35, 103.82], [1.29, 103.85]],
    },
    "Saudi Arabia": {
        "iso3": "SAU",
        "lat": 23.9,
        "lng": 45.1,
        "anchors": [[24.71, 46.68], [21.49, 39.19], [26.43, 50.1]],
    },
    "United Arab Emirates": {
        "iso3": "ARE",
        "lat": 24.3,
        "lng": 54.3,
        "anchors": [[25.2, 55.27], [24.45, 54.38]],
    },
    "Sweden": {
        "iso3": "SWE",
        "lat": 62.0,
        "lng": 15.0,
        "anchors": [[59.33, 18.07], [65.58, 22.15]],
    },
    "Finland": {
        "iso3": "FIN",
        "lat": 64.0,
        "lng": 26.0,
        "anchors": [[60.17, 24.94], [65.01, 25.47]],
    },
    "Norway": {
        "iso3": "NOR",
        "lat": 60.5,
        "lng": 8.5,
        "anchors": [[59.91, 10.75], [60.39, 5.32], [63.43, 10.39]],
    },
    "Netherlands": {
        "iso3": "NLD",
        "lat": 52.1,
        "lng": 5.3,
        "anchors": [[52.37, 4.9], [51.44, 5.48]],
    },
}


FACTOR_DEFS = {
    "compute": {
        "label": "Compute",
        "color": "#1491ff",
        "summary": (
            "Direct country score built from supercomputer capacity, supercomputer count, "
            "and internet download speed."
        ),
        "methodology": (
            "This layer now uses measured country indicators rather than synthetic regional bumps. "
            "Heavy-tailed metrics are log-scaled before min-max normalization."
        ),
        "metrics": [
            ("compute_capacity_rmax_gflops", 0.65, "log"),
            ("number_of_supercomputers", 0.25, "log"),
            ("internet_speed_median_download_mbps", 0.10, "linear"),
        ],
        "sources": [
            {
                "name": "Stanford HAI Global AI Vibrancy Tool",
                "url": "https://d3i91vx6n7fixv.cloudfront.net/",
                "detail": "Top500 compute capacity, supercomputer count, and Ookla internet-speed indicators.",
            }
        ],
    },
    "algorithms": {
        "label": "Algorithms",
        "color": "#7251ff",
        "summary": (
            "Direct country score built from notable AI models, AI publications, total AI citations, "
            "and AI patent grants."
        ),
        "methodology": (
            "This is a research-production score, not a claim about every algorithmic breakthrough. "
            "The score tracks visible country-level output and recognition."
        ),
        "metrics": [
            ("number_of_notable_ml_models", 0.40, "log"),
            ("number_of_total_publications", 0.25, "log"),
            ("number_of_total_citations", 0.20, "log"),
            ("number_of_total_patent_grants", 0.15, "log"),
        ],
        "sources": [
            {
                "name": "Stanford HAI Global AI Vibrancy Tool",
                "url": "https://d3i91vx6n7fixv.cloudfront.net/",
                "detail": "AI Index publication/citation/patent indicators and Epoch AI notable-model counts.",
            }
        ],
    },
    "data": {
        "label": "Data / Open Artifact Ecosystems",
        "color": "#0581a9",
        "summary": (
            "Proxy score built from AI GitHub project counts and GitHub star gravity. "
            "This is a lower-confidence proxy than compute or talent because comprehensive country-level "
            "dataset-access metrics are not publicly standardized."
        ),
        "methodology": (
            "This factor intentionally uses an explicit proxy label. It tracks visible open artifact "
            "production and reuse surfaces rather than pretending to measure every proprietary data moat."
        ),
        "metrics": [
            ("number_of_github_repos", 0.55, "log"),
            ("number_of_github_stars", 0.45, "log"),
        ],
        "sources": [
            {
                "name": "Stanford HAI Global AI Vibrancy Tool",
                "url": "https://d3i91vx6n7fixv.cloudfront.net/",
                "detail": "GitHub AI project and GitHub AI project star indicators.",
            }
        ],
    },
    "storage": {
        "label": "Storage / Cloud Region Surface",
        "color": "#0b90c4",
        "summary": (
            "Direct infrastructure proxy built from current public cloud region footprint across AWS, Azure, "
            "and Alibaba Cloud, plus available AWS/Alibaba availability-zone depth."
        ),
        "methodology": (
            "This factor is current-inventory based. Historical country-level storage data is not consistently "
            "published across providers, so the public cloud footprint is used as the most inspectable storage-proxy layer."
        ),
        "metrics": [
            ("cloud_regions_total", 0.70, "linear"),
            ("cloud_az_total", 0.30, "linear"),
        ],
        "sources": [
            {
                "name": "AWS Global Infrastructure",
                "url": "https://aws.amazon.com/about-aws/global-infrastructure/",
                "detail": "Region and availability-zone inventory by location.",
            },
            {
                "name": "Azure Geographies",
                "url": "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
                "detail": "Current public Azure geography and region listing.",
            },
            {
                "name": "Alibaba Cloud Global Locations",
                "url": "https://www.alibabacloud.com/en/global-locations",
                "detail": "Current public region and availability-zone listing.",
            },
        ],
    },
    "energy": {
        "label": "Energy",
        "color": "#d69a34",
        "summary": (
            "Direct country score built from total electricity generation, low-carbon electricity output, "
            "and low-carbon share of electricity generation."
        ),
        "methodology": (
            "This energy score is intentionally weighted toward absolute electricity and low-carbon electricity scale "
            "so that AI-economy power capacity matters more than clean-share optics alone."
        ),
        "metrics": [
            ("electricity_generation", 0.55, "log"),
            ("low_carbon_electricity", 0.30, "log"),
            ("low_carbon_share_elec", 0.15, "linear"),
        ],
        "sources": [
            {
                "name": "Our World in Data Energy Dataset",
                "url": "https://github.com/owid/energy-data",
                "detail": "Country electricity generation and low-carbon electricity series compiled from Energy Institute / Ember inputs.",
            }
        ],
    },
    "talent": {
        "label": "AI Talent",
        "color": "#de6b48",
        "summary": (
            "Direct country score built from relative AI skills penetration and AI talent concentration."
        ),
        "methodology": (
            "This factor follows LinkedIn-based country talent indicators exposed through Stanford HAI. "
            "Coverage differences still matter, so the metric should be read as a comparative platform signal, not a census."
        ),
        "metrics": [
            ("relative_ai_skills_penetration", 0.55, "linear"),
            ("ai_talent_concentration", 0.45, "log"),
        ],
        "sources": [
            {
                "name": "Stanford HAI Global AI Vibrancy Tool",
                "url": "https://d3i91vx6n7fixv.cloudfront.net/",
                "detail": "LinkedIn relative AI skills penetration and AI talent concentration indicators.",
            }
        ],
    },
}


YEAR_NOTES = {
    "2024": "2024 published country snapshot using measured public-source inputs.",
    "2025": "2025 carry-forward snapshot. Country-level indicator releases remain incomplete beyond 2024 for several observatory inputs, so this view keeps the latest measured public values rather than fabricating annual bumps.",
    "2026": "2026 current observatory synthesis. Country-level research, talent, and compute indicators still use the latest published public values; current cloud footprint is refreshed from official provider inventories.",
}


def fetch_text(url):
    os.makedirs(CACHE_DIR, exist_ok=True)
    cache_name = re.sub(r"[^a-zA-Z0-9._-]+", "_", url)
    cache_path = os.path.join(CACHE_DIR, cache_name)
    if os.path.exists(cache_path):
        with open(cache_path, "r", encoding="utf-8", errors="replace") as handle:
            return handle.read()
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Duckermind-Observatory/1.0 (+https://duckermind.com)"
        },
    )
    with urllib.request.urlopen(req, timeout=120) as response:
        body = response.read().decode("utf-8", errors="replace")
    with open(cache_path, "w", encoding="utf-8") as handle:
        handle.write(body)
    return body


def fetch_csv(url):
    return list(csv.DictReader(io.StringIO(fetch_text(url).lstrip("\ufeff"))))


def min_max_normalize(values, mode):
    prepared = []
    for value in values:
        if value is None:
            prepared.append(None)
            continue
        if mode == "log":
            prepared.append(math.log1p(max(value, 0)))
        else:
            prepared.append(value)
    numeric = [value for value in prepared if value is not None]
    low = min(numeric)
    high = max(numeric)
    if math.isclose(low, high):
        return [50 if value is not None else None for value in prepared]
    return [
        None if value is None else (value - low) / (high - low) * 100
        for value in prepared
    ]


def weighted_score(rows, factor_name):
    factor = FACTOR_DEFS[factor_name]
    country_names = list(COUNTRIES.keys())
    normalized_by_metric = {}
    for metric_name, _, mode in factor["metrics"]:
        metric_values = [rows[country].get(metric_name) for country in country_names]
        normalized_by_metric[metric_name] = min_max_normalize(metric_values, mode)

    scores = {}
    for idx, country in enumerate(country_names):
        total = 0
        weight_total = 0
        metric_lines = []
        for metric_name, weight, _ in factor["metrics"]:
            raw_value = rows[country].get(metric_name)
            normalized = normalized_by_metric[metric_name][idx]
            if raw_value is None or normalized is None:
                continue
            total += normalized * weight
            weight_total += weight
            metric_lines.append(
                {
                    "metric": metric_name,
                    "value": raw_value,
                    "normalized": round(normalized, 2),
                }
            )
        scores[country] = {
            "score": round(total / weight_total if weight_total else 0, 2),
            "metrics": metric_lines,
        }
    return scores


def parse_aws_counts():
    html_text = fetch_text(AWS_URL)
    script_blobs = re.findall(
        r'<script type="application/json">(.*?)</script>', html_text, re.DOTALL
    )
    continents = None
    for blob in script_blobs:
        try:
            payload = json.loads(blob)
        except json.JSONDecodeError:
            continue
        for item in payload.get("data", {}).get("items", []):
            fields = item.get("fields", {})
            if "continents" in fields:
                continents = json.loads(fields["continents"])
                break
        if continents:
            break
    counts = {
        country: {"cloud_regions_aws": 0, "cloud_az_aws": 0} for country in COUNTRIES
    }
    if not continents:
        return counts

    def map_name(name):
        if "GovCloud" in name or "European Sovereign Cloud" in name:
            return None
        if name.startswith("US "):
            return "United States"
        if name.startswith("Canada "):
            return "Canada"
        if "Mainland China" in name:
            return "China"
        if name == "Asia Pacific (Singapore)":
            return "Singapore"
        if name in {"Asia Pacific (Mumbai)", "Asia Pacific (Hyderabad)"}:
            return "India"
        if name in {"Asia Pacific (Tokyo)", "Asia Pacific (Osaka)"}:
            return "Japan"
        if name == "Asia Pacific (Seoul)":
            return "South Korea"
        if name == "Europe (Frankfurt)":
            return "Germany"
        if name == "Europe (Paris)":
            return "France"
        if name == "Europe (London)":
            return "United Kingdom"
        if name == "Europe (Stockholm)":
            return "Sweden"
        if name == "Middle East (UAE)":
            return "United Arab Emirates"
        if name == "Kingdom of Saudi Arabia":
            return "Saudi Arabia"
        return None

    for continent in continents:
        for region in continent.get("regions", []):
            if not region.get("available", False):
                continue
            country = map_name(region.get("name", ""))
            if not country:
                continue
            counts[country]["cloud_regions_aws"] += 1
            counts[country]["cloud_az_aws"] += int(region.get("availabilityZones", 0) or 0)
    return counts


def parse_azure_counts():
    html_text = fetch_text(AZURE_URL)
    match = re.search(
        r"Within these geographies, Azure is available or coming soon to the following regions:(.*?)</p>",
        html_text,
        re.DOTALL,
    )
    counts = {country: {"cloud_regions_azure": 0} for country in COUNTRIES}
    if not match:
        return counts
    text = html.unescape(re.sub(r"<[^>]+>", "", match.group(1)))
    regions = [part.strip(" .") for part in text.split(",") if part.strip()]

    def map_region(name):
        if name.startswith(("US Gov", "US DoD", "US Sec")):
            return None
        if name.startswith(
            (
                "South Central US",
                "West US",
                "Central US",
                "East US",
                "West Central US",
                "North Central US",
            )
        ):
            return "United States"
        if name.startswith("Canada "):
            return "Canada"
        if name.startswith("China "):
            return "China"
        if name.startswith(("Central India", "South India", "West India")):
            return "India"
        if name.startswith("Japan "):
            return "Japan"
        if name.startswith("Korea "):
            return "South Korea"
        if name == "Southeast Asia":
            return "Singapore"
        if name.startswith("France "):
            return "France"
        if name.startswith("Germany "):
            return "Germany"
        if name.startswith("Norway "):
            return "Norway"
        if name.startswith("Sweden "):
            return "Sweden"
        if name == "Finland Central":
            return "Finland"
        if name.startswith("UK "):
            return "United Kingdom"
        if name.startswith("UAE "):
            return "United Arab Emirates"
        if name.startswith("Saudi Arabia "):
            return "Saudi Arabia"
        if name == "Belgium Central":
            return "Netherlands"
        return None

    for region in regions:
        country = map_region(region)
        if country:
            counts[country]["cloud_regions_azure"] += 1
    return counts


def parse_alibaba_counts():
    html_text = fetch_text(ALIBABA_URL)
    intl_match = re.search(r"window\.intlRegions=(\[.*?\]);", html_text, re.DOTALL)
    domestic_match = re.search(
        r"window\.domesticRegions=(\[.*?\]);", html_text, re.DOTALL
    )
    counts = {
        country: {"cloud_regions_alibaba": 0, "cloud_az_alibaba": 0}
        for country in COUNTRIES
    }
    intl_regions = json.loads(intl_match.group(1)) if intl_match else []
    domestic_regions = json.loads(domestic_match.group(1)) if domestic_match else []

    def map_name(name):
        if name.startswith("Singapore"):
            return "Singapore"
        if name.startswith("Japan"):
            return "Japan"
        if name.startswith("South Korea"):
            return "South Korea"
        if name.startswith("US "):
            return "United States"
        if name.startswith("Germany"):
            return "Germany"
        if name.startswith("UAE"):
            return "United Arab Emirates"
        if name.startswith("SAU"):
            return "Saudi Arabia"
        if name.startswith("China"):
            return "China"
        return None

    for region in intl_regions + domestic_regions:
        country = map_name(region.get("name", ""))
        if not country:
            continue
        counts[country]["cloud_regions_alibaba"] += 1
        counts[country]["cloud_az_alibaba"] += int(region.get("number", 0) or 0)
    return counts


def build_ai_rows():
    rows = fetch_csv(AI_VIBRANCY_URL)
    lookup = {}
    for row in rows:
        if row["PublishYear"] != "2024":
            continue
        if row["CountryName"] in COUNTRIES:
            lookup[row["CountryName"]] = row
    built = {}
    for country in COUNTRIES:
        if country not in lookup:
            raise RuntimeError(f"Missing AI vibrancy row for {country}")
        row = lookup[country]
        built[country] = {
            "number_of_total_publications": float(row["number_of_total_publications"] or 0),
            "number_of_total_citations": float(row["number_of_total_citations"] or 0),
            "number_of_total_patent_grants": float(row["number_of_total_patent_grants"] or 0),
            "number_of_notable_ml_models": float(row["number_of_notable_ml_models"] or 0),
            "number_of_github_repos": float(row["number_of_github_repos"] or 0),
            "number_of_github_stars": float(row["number_of_github_stars"] or 0),
            "relative_ai_skills_penetration": float(
                row["relative_ai_skills_penetration"] or 0
            ),
            "ai_talent_concentration": float(row["ai_talent_concentration"] or 0),
            "parts_semiconductor_devices_export_value": float(
                row["parts_semiconductor_devices_export_value"] or 0
            ),
            "number_of_supercomputers": float(row["number_of_supercomputers"] or 0),
            "compute_capacity_rmax_gflops": float(
                row["compute_capacity_rmax_gflops"] or 0
            ),
            "internet_speed_median_download_mbps": float(
                row["internet_speed_median_download_mbps"] or 0
            ),
        }
    return built


def build_energy_rows():
    metric_payload = {}
    for metric_name, url in ENERGY_URLS.items():
        metric_rows = fetch_csv(url)
        metric_payload[metric_name] = {}
        for row in metric_rows:
            country = row["Entity"]
            if country not in COUNTRIES:
                continue
            value_columns = [
                key
                for key in row.keys()
                if key not in {"Entity", "Code", "Year"} and not key.endswith("(Original Year)")
            ]
            if not value_columns:
                continue
            metric_payload[metric_name][country] = float(row[value_columns[0]] or 0)

    latest = {}
    for country in COUNTRIES:
        latest[country] = {
            "electricity_generation": metric_payload["electricity_generation"].get(country, 0),
            "low_carbon_electricity": metric_payload["low_carbon_electricity"].get(country, 0),
            "low_carbon_share_elec": metric_payload["low_carbon_share_elec"].get(country, 0),
        }

    missing = [
        country
        for country in COUNTRIES
        if not latest[country]["electricity_generation"]
        and not latest[country]["low_carbon_electricity"]
    ]
    if missing:
        raise RuntimeError(f"Missing energy rows: {', '.join(missing)}")
    return latest


def combine_rows():
    ai_rows = build_ai_rows()
    energy_rows = build_energy_rows()
    aws_counts = parse_aws_counts()
    azure_counts = parse_azure_counts()
    alibaba_counts = parse_alibaba_counts()
    combined = {}
    for country, country_meta in COUNTRIES.items():
        row = {}
        row.update(ai_rows[country])
        row.update(energy_rows[country])
        row.update(aws_counts[country])
        row.update(azure_counts[country])
        row.update(alibaba_counts[country])
        row["cloud_regions_total"] = (
            row.get("cloud_regions_aws", 0)
            + row.get("cloud_regions_azure", 0)
            + row.get("cloud_regions_alibaba", 0)
        )
        row["cloud_az_total"] = (
            row.get("cloud_az_aws", 0) + row.get("cloud_az_alibaba", 0)
        )
        row["name"] = country
        row["iso3"] = country_meta["iso3"]
        row["lat"] = country_meta["lat"]
        row["lng"] = country_meta["lng"]
        row["anchors"] = country_meta["anchors"]
        combined[country] = row
    return combined


def format_metric(metric_name, value):
    display_name = {
        "compute_capacity_rmax_gflops": "Top500 compute capacity (Rmax GFlops)",
        "number_of_supercomputers": "Top500 supercomputers",
        "parts_semiconductor_devices_export_value": "Semiconductor-device exports (USD)",
        "internet_speed_median_download_mbps": "Median internet download speed (Mbps)",
        "number_of_notable_ml_models": "Notable AI models",
        "number_of_total_publications": "AI publications",
        "number_of_total_citations": "AI citations",
        "number_of_total_patent_grants": "AI patent grants",
        "number_of_github_repos": "AI GitHub projects",
        "number_of_github_stars": "AI GitHub stars",
        "cloud_regions_total": "Public cloud regions (AWS + Azure + Alibaba)",
        "cloud_az_total": "AWS + Alibaba availability zones",
        "electricity_generation": "Electricity generation (TWh)",
        "low_carbon_electricity": "Low-carbon electricity (TWh)",
        "low_carbon_share_elec": "Low-carbon electricity share (%)",
        "relative_ai_skills_penetration": "Relative AI skills penetration",
        "ai_talent_concentration": "AI talent concentration",
    }[metric_name]
    if metric_name == "low_carbon_share_elec":
        rendered = round(value, 2)
    elif metric_name.endswith("_value"):
        rendered = round(value, 0)
    elif metric_name == "compute_capacity_rmax_gflops":
        rendered = round(value, 0)
    elif value >= 100:
        rendered = round(value, 0)
    else:
        rendered = round(value, 3)
    return {"label": display_name, "value": rendered}


def build_factor_payload(rows, factor_name):
    factor_scores = weighted_score(rows, factor_name)
    factor = FACTOR_DEFS[factor_name]
    entries = []
    for country, score_data in factor_scores.items():
        metric_lines = [
            format_metric(metric["metric"], metric["value"])
            for metric in score_data["metrics"]
        ]
        entries.append(
            {
                "name": country,
                "iso3": rows[country]["iso3"],
                "lat": rows[country]["lat"],
                "lng": rows[country]["lng"],
                "anchors": rows[country]["anchors"],
                "value": score_data["score"],
                "note": f"{factor['label']} score built from measured public indicators; see metric lines and methodology for details.",
                "metrics": metric_lines,
            }
        )
    entries.sort(key=lambda item: item["value"], reverse=True)
    return {
        "label": factor["label"],
        "color": factor["color"],
        "summary": factor["summary"],
        "methodology": factor["methodology"],
        "sources": factor["sources"],
        "items": entries,
    }


def main():
    rows = combine_rows()
    factors = {
        factor_name: build_factor_payload(rows, factor_name)
        for factor_name in FACTOR_DEFS
    }
    payload = {
        "generatedAt": "2026-03-17",
        "statusNote": (
            "This observatory build removes the earlier synthetic 2025/2026 bump logic. "
            "Where newer country-level releases are unavailable, the latest measured public values are carried forward instead of guessed."
        ),
        "yearNotes": YEAR_NOTES,
        "factors": factors,
        "years": {
            year: {factor_name: factors[factor_name]["items"] for factor_name in factors}
            for year in YEAR_NOTES
        },
    }
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)
        handle.write("\n")


if __name__ == "__main__":
    main()

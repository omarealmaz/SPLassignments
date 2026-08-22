// AuraFS Presentation - Complete Slides Data (Slides 1 to 73)
// Themed with Undertale Zones, Dialogue Boxes, and Interactive Metadata
// Strictly Compliant with AuraFS Technical Datasheet & Reference Manual (Rev 2.0.3)

const SLIDES_DATA = [
  {
    "id": 1,
    "chapter": "Table of Contents",
    "zone": "treasuremap",
    "zoneName": "Overworld: Treasure Map",
    "title": "AuraFS Expedition Map & Table of Contents",
    "subtitle": "Master Navigation Guide Across All Storage Domains & Architectural Pillars",
    "badge": "WORLD MAP",
    "quote": "Follow the charted expedition path from foundational storage domains to atomic consistency, advanced innovations, and FAT32 battle arenas.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-yellow\"><span class=\"pixel-star-large\">★</span> OVERWORLD EXPEDITION ROUTE (73 SLIDES MASTER SPECIFICATION)</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Chapter / Domain</th>\n              <th>Zone Realm</th>\n              <th>Architectural Focus & Struct Deep Dives</th>\n              <th>Deck Slides</th>\n              <th>❄️🔥 Comparison Arena</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>Ch 1: Universal Intro</strong></td>\n              <td><span class=\"pill-badge hl-purple\">🏛️ The Ruins</span></td>\n              <td>Logical View vs Physical Reality & 9 Core Micro-Architectural Pillars</td>\n              <td><strong>Slides 1–5</strong></td>\n              <td><strong class=\"hl-cyan\">❄️ Slide 6: Core Philosophy</strong></td>\n            </tr>\n            <tr>\n              <td><strong>Ch 2: Disk Layout</strong></td>\n              <td><span class=\"pill-badge hl-cyan\">🌲 Snowdin</span></td>\n              <td><strong>Macro-to-Micro Flow:</strong> Global Disk ➔ Superblock ➔ Summaries ➔ WAL ➔ Zones ➔ Pages ➔ Bitmaps ➔ Units</td>\n              <td><strong>Slides 7–24</strong></td>\n              <td><strong class=\"hl-cyan\">❄️ Slide 25: Disk Layout & Locality</strong></td>\n            </tr>\n            <tr>\n              <td><strong>Ch 3: Free Space & Z-Nodes</strong></td>\n              <td><span class=\"pill-badge hl-cyan\">💧 Waterfall</span></td>\n              <td>Local Bitmaps, <code>znode_disk_t</code>, <code>ufs_extent_disk_t</code>, <code>extent_page_disk_t</code> & 992-File Limits</td>\n              <td><strong>Slides 26–36</strong></td>\n              <td><strong class=\"hl-cyan\">❄️ Slide 37: Free Space & Metadata</strong></td>\n            </tr>\n            <tr>\n              <td><strong>Ch 4: Allocation & Granularity</strong></td>\n              <td><span class=\"pill-badge hl-blue\">⚡ The Core</span></td>\n              <td>Variable Tiers (512B/4K/16K), Contiguity, Slack Reuse, Tier-0 Inline, xattrs & LZ4</td>\n              <td><strong>Slides 38–58</strong></td>\n              <td><strong class=\"hl-cyan\">❄️ Slide 59: Allocation & Sizing</strong></td>\n            </tr>\n            <tr>\n              <td><strong>Ch 5: Directory & Consistency</strong></td>\n              <td><span class=\"pill-badge hl-pink\">🏰 The Barrier</span></td>\n              <td><code>dir_disk_t</code>, Hot Cache, <code>journal_record_disk_t</code> & &lt;5ms WAL Crash Replay</td>\n              <td><strong>Slides 60–70</strong></td>\n              <td><strong class=\"hl-cyan\">❄️ Slide 71: Directories & Crash Safety</strong></td>\n            </tr>\n            <tr>\n              <td><strong>Ch 6: Summary & Blueprint</strong></td>\n              <td><span class=\"pill-badge hl-gold\">👑 Final Encounter</span></td>\n              <td>Master Blueprint, 7-Phase FSCK Engine, Benchmarks & C Embedding APIs</td>\n              <td><strong>Slides 72–73</strong></td>\n              <td><strong class=\"hl-green\">★ Master Architecture</strong></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    <div class=\"undertale-grid-2 mt-2\">\n      <div class=\"battle-card yellow-theme\">\n        <div class=\"card-title\">🧭 NAVIGATION TIPS</div>\n        <p class=\"text-xs\">Press <strong>[M]</strong> or <strong>[O]</strong> anytime to open the interactive World Map grid, or use <strong>[Left/Right Arrow]</strong> to explore.</p>\n      </div>\n      <div class=\"battle-card orange-theme\">\n        <div class=\"card-title\">❄️🔥 FROSTFIRE ARENAS</div>\n        <p class=\"text-xs\">At the end of each chapter, enter the blizzard arena to inspect how FAT32 compares against AuraFS.</p>\n      </div>\n    </div>\n    "
  },
  {
    "id": 2,
    "chapter": "Chapter 1: Universal Introduction",
    "zone": "ruins",
    "zoneName": "Zone 00: The Ruins",
    "title": "AuraFS — Rethinking How a Filesystem Uses the Disk",
    "subtitle": "Locality, Flexible Allocation & Explicit Metadata",
    "badge": "TEAM AURA",
    "quote": "We separate what a file means logically from where its bytes physically live.",
    "type": "title",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card purple-theme\">\n          <div class=\"card-title\"><span class=\"pixel-heart\"></span> LOGICAL VIEW vs PHYSICAL REALITY</div>\n          <div class=\"ascii-block text-sm\">\n                    AuraFS\n                       │\n        ┌──────────────┴──────────────┐\n        │                             │\n   LOGICAL VIEW                 PHYSICAL REALITY\n        │                             │\n   Files / offsets             Zones / blocks\n   Directories                  Metadata\n   Logical blocks               Free space\n                                Physical extents\n          </div>\n        </div>\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title\">🌐 LEFT-TO-RIGHT TRANSFORMATION</div>\n          <div class=\"ascii-block text-sm\">\nwrite(\"notes.txt\", data)\n          │\n          ▼\n   LOGICAL FILE: L0 → L1 → L2 → L3\n          │\n          ▼\n        AuraFS\n          │\n          ▼\n   PHYSICAL DISK:\n   Zone 2:       Zone 2:       Zone 5:\n   [L0][L1]      [L2]          [L3]\n          </div>\n        </div>\n      </div>\n      <div class=\"undertale-box mt-3\">\n        <div class=\"box-header\"><span class=\"pixel-star\">★</span> CORE ARCHITECTURAL PRINCIPLE</div>\n        <p class=\"hl-yellow text-center\">\n          \"The logical file is continuous even when its physical representation isn't.\"\n        </p>\n      </div>\n    "
  },
  {
    "id": 3,
    "chapter": "Chapter 1: Universal Introduction",
    "zone": "ruins",
    "zoneName": "Zone 00: The Ruins",
    "title": "The Filesystem Has to Solve Six Problems at Once",
    "subtitle": "Six Coupled Architectural Decisions",
    "quote": "These decisions are coupled — changing one affects all the others.",
    "content": "\n      <div class=\"grid-3-col\">\n        <div class=\"feature-card cyan-border\">\n          <div class=\"feature-num hl-cyan\">01</div>\n          <div class=\"feature-title\">DISK LAYOUT</div>\n          <p class=\"feature-desc\">Where should everything live on disk?</p>\n        </div>\n        <div class=\"feature-card yellow-border\">\n          <div class=\"feature-num hl-yellow\">02</div>\n          <div class=\"feature-title\">ALLOCATION</div>\n          <p class=\"feature-desc\">How much physical space do we use?</p>\n        </div>\n        <div class=\"feature-card green-border\">\n          <div class=\"feature-num hl-green\">03</div>\n          <div class=\"feature-title\">MAPPING</div>\n          <p class=\"feature-desc\">Where are the file's blocks stored?</p>\n        </div>\n        <div class=\"feature-card orange-border\">\n          <div class=\"feature-num hl-orange\">04</div>\n          <div class=\"feature-title\">FREE SPACE</div>\n          <p class=\"feature-desc\">Where is usable free space located?</p>\n        </div>\n        <div class=\"feature-card purple-border\">\n          <div class=\"feature-num hl-purple\">05</div>\n          <div class=\"feature-title\">NAMESPACE</div>\n          <p class=\"feature-desc\">How do paths become directory entries?</p>\n        </div>\n        <div class=\"feature-card red-border\">\n          <div class=\"feature-num hl-red\">06</div>\n          <div class=\"feature-title\">CRASH CONSISTENCY</div>\n          <p class=\"feature-desc\">What happens if power fails mid-write?</p>\n        </div>\n      </div>\n      <div class=\"undertale-box mt-3 text-center\">\n        <div class=\"box-header\">CIRCULAR INTERDEPENDENCY</div>\n        <code class=\"hl-cyan\">DISK LAYOUT ➔ ALLOCATION ➔ MAPPING ➔ FREE SPACE ➔ NAMESPACE ➔ CRASH CONSISTENCY ➔ DISK LAYOUT</code>\n      </div>\n    "
  },
  {
    "id": 4,
    "chapter": "Chapter 1: Universal Introduction",
    "zone": "ruins",
    "zoneName": "Zone 00: The Ruins",
    "title": "Our Design Objective",
    "subtitle": "Local, Flexible, and Recoverable Storage",
    "quote": "Make physical storage decisions local, flexible, and recoverable — without exposing physical complexity to the application.",
    "content": "\n      <div class=\"grid-3-col\">\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title\">1. LOCALITY</div>\n          <p class=\"text-sm\">Keep related metadata and data physically close whenever possible to reduce disk traversal and head contention.</p>\n        </div>\n        <div class=\"battle-card yellow-theme\">\n          <div class=\"card-title\">2. FLEXIBILITY</div>\n          <p class=\"text-sm\">Allow files to use different physical granularities (512B / 4KB / 16KB) and span multiple physical extents seamlessly.</p>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title\">3. RESILIENCE</div>\n          <p class=\"text-sm\">Make multi-structure updates atomic and recoverable through explicit delta journaling across power failures.</p>\n        </div>\n      </div>\n\n      <div class=\"undertale-box mt-4\">\n        <div class=\"box-header\">LAYERED DESIGN ABSTRACTION</div>\n        <div class=\"ascii-block text-xs\">\n              APPLICATION (\"read/write a file\")\n                    │\n                    ▼\n              ┌─────────┐\n              │ AuraFS  │\n              └─────────┘\n                    │\n        ┌───────────┼───────────┐\n        ▼           ▼           ▼\n     LOCALITY    FLEXIBILITY  RESILIENCE\n        </div>\n      </div>\n    "
  },
  {
    "id": 5,
    "chapter": "Chapter 1: Universal Introduction",
    "zone": "ruins",
    "zoneName": "Zone 00: The Ruins",
    "title": "One Filesystem — Six Architectural Decisions",
    "subtitle": "Turning Logical Files into Persistent Physical Storage",
    "quote": "Each section answers one fundamental question about persistent storage.",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\">AURAFS MODULAR DECOMPOSITION & 9 ARCHITECTURAL PILLARS</div>\n        <div class=\"matrix-table-wrapper\">\n          <table class=\"pixel-table text-sm\">\n            <thead>\n              <tr>\n                <th>Section</th>\n                <th>Core Question</th>\n                <th>AuraFS Architectural Answer & Datasheet Compliance</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr><td><span class=\"hl-cyan\">01 Disk Layout</span></td><td>How is physical disk organized?</td><td>Hierarchical Global-to-Local: Superblock ➔ WAL Journal ➔ 32 Local Zones ➔ 512B Units</td></tr>\n              <tr><td><span class=\"hl-yellow\">02 Allocation</span></td><td>How do we choose physical space?</td><td>Multi-granularity (512B/4K/16K) + Tier-0 Inline (≤384B) + Contiguous-First Next-Fit</td></tr>\n              <tr><td><span class=\"hl-green\">03 Mapping</span></td><td>How do blocks map to storage?</td><td>Direct 16-extent table in Z-Node + Chained 512B overflow pages (17 extents/page)</td></tr>\n              <tr><td><span class=\"hl-orange\">04 Free Space</span></td><td>How to find space efficiently?</td><td>Global Zone Summaries (768B) + Local 512B Unit Bitmaps + 64-bit Bitwise Scanner</td></tr>\n              <tr><td><span class=\"hl-purple\">05 Namespace</span></td><td>How do path strings resolve?</td><td>64-Byte <code>dir_disk_t</code> records + 128-entry Hot Directory Cache (FNV1a-64, LRU)</td></tr>\n              <tr><td><span class=\"hl-red\">06 Crash Safety</span></td><td>How to survive unexpected crash?</td><td>2MB Circular WAL Journal (512 pages) + &lt;5ms Monotonic TxID Replay Engine</td></tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    "
  },
  {
    "id": 6,
    "chapter": "Comparison: Introduction",
    "zone": "blizzard",
    "zoneName": "Frostfire: FAT32 vs AuraFS",
    "title": "FAT32 vs. AuraFS: Core Philosophy",
    "subtitle": "Monolithic Flat Table vs. Layered Locality & Extents",
    "quote": "FAT32 was engineered in 1977 for floppy disks; AuraFS is built for modern zoned storage with spatial locality and variable granularities.",
    "content": "\n    <div class=\"undertale-grid-2\">\n      <div class=\"battle-card cyan-theme\">\n        <div class=\"card-title hl-cyan\">❄️ FAT32 (1977 LEGACY)</div>\n        <ul class=\"pixel-list text-xs\">\n          <li><strong>Monolithic Layout:</strong> Flat single table index with no domain isolation.</li>\n          <li><strong>Rigid Indexing:</strong> File offsets strictly chained cluster-by-cluster.</li>\n          <li><strong>Single Fixed Granularity:</strong> One cluster size across the entire drive.</li>\n          <li><strong>Global Bottleneck:</strong> Every write contends on the same global FAT.</li>\n        </ul>\n      </div>\n      <div class=\"battle-card orange-theme\">\n        <div class=\"card-title hl-orange\">🔥 AURAFS ARCHITECTURE</div>\n        <ul class=\"pixel-list text-xs\">\n          <li><strong>Zoned Storage Domains:</strong> Autonomous zones isolate metadata & data.</li>\n          <li><strong>Decoupled Abstraction:</strong> Logical stream decoupled from physical extents.</li>\n          <li><strong>Multi-Granularity:</strong> 512B, 4KiB, and 16KiB right-sized physical units.</li>\n          <li><strong>Atomic Resilience:</strong> Delta-based journaling guarantees zero corrupted state.</li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"undertale-box mt-3 text-center\">\n      <div class=\"box-header hl-yellow\">PARADIGM SHIFT</div>\n      <p class=\"text-xs\">FAT32 treats disk as one giant flat array; AuraFS organizes it into localized, resilient storage domains.</p>\n    </div>\n    "
  },
  {
    "id": 7,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "01 — Disk Layout: Hierarchical Spatial Organization",
    "subtitle": "From Macro Global Structures Down to Micro Local Units",
    "type": "divider",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header hl-cyan\"><span class=\"pixel-star-large\">★</span> THE 5-TIER MACRO-TO-MICRO STRUCTURAL HIERARCHY</div>\n        <div class=\"ascii-block text-xs\">\n┌─────────────────────────────────────────────────────────────────────────────────────────┐\n│ TIER 1: GLOBAL PHYSICAL DISK (32 MB / 8,192 Pages)                                      │\n├─────────────────────────────────────────┬───────────────────────────────────────────────┤\n│ TIER 2: GLOBAL MANAGEMENT AREA          │ TIER 3: REGIONAL STORAGE DOMAINS              │\n│  ├─ Page 0: Superblock (4KB)            │  ├─ 32 Autonomous Zones (Pages 513..8191)     │\n│  ├─ Page 0 (0x34): 32 Summaries (768B)  │  ├─ 239 Pages per Zone (1 MB each)            │\n│  └─ Pages 1..512: WAL Journal (2.0 MB)  │  └─ Bounded Blast Radius & Local Locks        │\n├─────────────────────────────────────────┼───────────────────────────────────────────────┤\n│ TIER 4: ZONE INTERNAL ARCHITECTURE      │ TIER 5: MICRO ALLOCATION UNITS                │\n│  ├─ Page 0: Zone Header (4,096 B)       │  ├─ Base 512-Byte Allocation Units            │\n│  ├─ Pages 1..4: Z-Node Table (32 Slots) │  ├─ Tier-0 Inline Data Payload (&le;384 Bytes) │\n│  ├─ Page 5: Local Bitmap (256 Bytes)    │  └─ Variable Extents (512B / 4KB / 16KB)      │\n│  └─ Units 48..N-1: Data Units Region    │                                               │\n└─────────────────────────────────────────┴───────────────────────────────────────────────┘\n        </div>\n      </div>\n      <p class=\"hl-yellow mt-2 text-center text-xs\">We explore the disk hierarchically: starting with the total volume, drilling down through global bootstrap structures, entering regional zones, and finally inspecting individual 512-byte allocation units.</p>\n    "
  },
  {
    "id": 8,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 1: Global Physical Disk Architecture",
    "subtitle": "Macro Organization of the 32 MB / 8,192-Page Persistent Volume",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header hl-yellow\"><span class=\"pixel-heart\"></span> GLOBAL DISK PARTITIONING & ADDRESS BOUNDARIES</div>\n        <div class=\"ascii-block text-xs\">\nOFFSET 0x00000000 ─────────────────────────────────────────────────────────────► OFFSET 0x02000000\n┌───────────────────────────┬─────────────────────────────────────────────────────────────────┐\n│ GLOBAL HEADER REGION      │ REGIONAL STORAGE POOL (32 AUTONOMOUS ZONES)                     │\n│ Pages 0..512 (2,052 KB)   │ Pages 513..8191 (7,679 Pages = 30.7 MB)                         │\n├─────────────┬─────────────┼──────────────┬──────────────┬──────────────┬────────────────────┤\n│ Superblock  │ WAL Journal │    ZONE 0    │    ZONE 1    │    ZONE 2    │    ZONE 31 ...     │\n│ Page 0 (4K) │ 512 Pages   │ Pages 513..  │ Pages 783..  │ Pages 1022.. │ Pages 7953..8191   │\n└─────────────┴─────────────┴──────────────┴──────────────┴──────────────┴────────────────────┘\n        </div>\n      </div>\n      <div class=\"grid-2x2 mt-2\">\n        <div class=\"feature-card cyan-border\">\n          <div class=\"feature-title hl-cyan\">1. GLOBAL HEADER REGION</div>\n          <p class=\"feature-desc\">Pages 0..512: Holds volume bootstrap geometry, transaction log, and global summary caches.</p>\n        </div>\n        <div class=\"feature-card green-border\">\n          <div class=\"feature-title hl-green\">2. REGIONAL STORAGE POOL</div>\n          <p class=\"feature-desc\">Pages 513..8191: Divided into 32 autonomous 1MB zones containing all file metadata and data.</p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 9,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 2A: The Global Area & Superblock Overview",
    "subtitle": "Page 0 (4,096 B): The Authoritative Master Bootstrap Anchor",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-cyan\">PAGE 0: MASTER BOOTSTRAP DESCRIPTOR</div>\n          <div class=\"ascii-block text-xs\">\nSUPERBLOCK (Page 0, Offset 0x0000):\n├── Magic Signature: 0x55465332 (\"UFS2\")\n├── Version: 2\n├── Image Size: 33,554,432 B (32 MB)\n├── Total 4KB Pages: 8,192 Pages\n├── Zone Count: 32 Zones (1 MB each)\n├── Root Object ID: 0x0000000000000001\n├── Journal Head: Active WAL Page\n├── Next TxID: Monotonic Counter\n├── FNV1a-32 Checksum: 0x811C9DC5\n└── Global Summaries: 32 Zone Descriptors\n          </div>\n        </div>\n        <div class=\"feature-card-list\">\n          <div class=\"feature-card yellow-border\">\n            <div class=\"feature-title hl-yellow\">★ ROOT BOOTSTRAP ANCHOR</div>\n            <p class=\"feature-desc\">Kernel reads Page 0 on mount to validate geometry and verify volume integrity.</p>\n          </div>\n          <div class=\"feature-card green-border\">\n            <div class=\"feature-title hl-green\">★ 4-BYTE FNV1a-32 CHECKSUM</div>\n            <p class=\"feature-desc\">Guarantees corruption detection before any disk structures are parsed.</p>\n          </div>\n          <div class=\"feature-card cyan-border\">\n            <div class=\"feature-title hl-cyan\">★ EMBEDDED ZONE ROUTING</div>\n            <p class=\"feature-desc\">Contains 32 cached zone summary descriptors starting at offset <code>0x0034</code>.</p>\n          </div>\n        </div>\n      </div>\n    "
  },
  {
    "id": 10,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Deep Dive: Superblock Struct (superblock_disk_t)",
    "subtitle": "Authoritative 4,096-Byte Master Bootstrap Descriptor at Page 0",
    "badge": "STRUCT ANATOMY",
    "quote": "Page 0 contains the root geometry, journal offsets, global zone boundaries, and the live 32-zone summary table.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-yellow\"><span class=\"pixel-heart\"></span> ON-DISK STRUCT: <code>superblock_disk_t</code> (4,096 Bytes / Page 0)</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Field Name</th>\n              <th>Type</th>\n              <th>Size</th>\n              <th>Offset</th>\n              <th>Architectural Role & Description</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>magic</code> / <code>version</code></td>\n              <td><code>uint32_t[2]</code></td>\n              <td><span class=\"pill-badge hl-cyan\">8 B</span></td>\n              <td><code>0x0000..0x0007</code></td>\n              <td>Filesystem signature (<code>0x55465332</code> = <code>\"UFS2\"</code>) & format version (<code>2</code>).</td>\n            </tr>\n            <tr>\n              <td><code>image_size</code> / <code>total_pages</code></td>\n              <td><code>uint32_t[2]</code></td>\n              <td><span class=\"pill-badge hl-cyan\">8 B</span></td>\n              <td><code>0x0008..0x000F</code></td>\n              <td>Total disk capacity (33,554,432 B) and 4KB page count (8,192 pages).</td>\n            </tr>\n            <tr>\n              <td><code>zone_count</code> / <code>zone_size</code></td>\n              <td><code>uint32_t[2]</code></td>\n              <td><span class=\"pill-badge hl-cyan\">8 B</span></td>\n              <td><code>0x0010..0x0017</code></td>\n              <td>Number of zones (<code>32</code>) and physical span per zone (<code>1,048,576 B</code> = 1 MB).</td>\n            </tr>\n            <tr>\n              <td><code>root_id</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-green\">8 B</span></td>\n              <td><code>0x0018..0x001F</code></td>\n              <td>Root Directory Compound Object ID (<code>0x0000000000000001</code>).</td>\n            </tr>\n            <tr>\n              <td><code>journal_head</code> / <code>clean</code></td>\n              <td><code>uint32_t[2]</code></td>\n              <td><span class=\"pill-badge hl-cyan\">8 B</span></td>\n              <td><code>0x0020..0x0027</code></td>\n              <td>Active WAL write page (1..512) & clean unmount flag (1=Clean, 0=Dirty).</td>\n            </tr>\n            <tr>\n              <td><code>next_txid</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-green\">8 B</span></td>\n              <td><code>0x0028..0x002F</code></td>\n              <td>Monotonically increasing transaction sequence generator counter.</td>\n            </tr>\n            <tr>\n              <td><code>checksum</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-cyan\">4 B</span></td>\n              <td><code>0x0030..0x0033</code></td>\n              <td>FNV1a-32 hash over bytes 0x0000..0x002F (Seed <code>0x811C9DC5</code>, Prime <code>0x01000193</code>).</td>\n            </tr>\n            <tr>\n              <td><code>zones[32]</code></td>\n              <td><code>zone_summary_disk_t[32]</code></td>\n              <td><span class=\"pill-badge hl-gold\">768 B</span></td>\n              <td><code>0x0034..0x0333</code></td>\n              <td><strong>Global Zone Summary Table</strong> (32 zones &times; 24 B = 768 B) for O(1) space discovery.</td>\n            </tr>\n            <tr>\n              <td><code>reserved[3276]</code></td>\n              <td><code>uint8_t[3276]</code></td>\n              <td><span class=\"pill-badge hl-purple\">3,276 B</span></td>\n              <td><code>0x0334..0x0FFF</code></td>\n              <td>Zero padding ensuring exact 4,096-Byte (1 Page) sector alignment.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    "
  },
  {
    "id": 11,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 2B: Global Zone Summaries (zone_summary_disk_t)",
    "subtitle": "768-Byte Compact Routing Table for O(1) Space Discovery",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title\">1. GLOBAL SUMMARY CACHE (RAM)</div>\n          <div class=\"ascii-block text-xs\">\nZone 0: free=200, largest_run=64\nZone 1: free=500, largest_run=128\nZone 2: free=10,  largest_run=4\nZone 3: free=800, largest_run=512 ★\n          </div>\n          <p class=\"text-xs mt-2 hl-cyan\">\"Zone 3 has a 512-unit contiguous run — allocate there instantly!\"</p>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title\">2. ZERO BITMAP I/O OVERHEAD</div>\n          <p class=\"text-xs\">\n            Instead of reading 32 MB of disk bitmaps across the drive, the kernel scans <strong>32 integers in RAM (768 Bytes)</strong>.\n          </p>\n          <ul class=\"pixel-list text-xs mt-2\">\n            <li>Fits entirely inside CPU L1 cache.</li>\n            <li>Guarantees $O(1)$ space discovery time.</li>\n            <li>Detects contiguous spans without touching disk blocks.</li>\n          </ul>\n        </div>\n      </div>\n      <div class=\"undertale-box mt-2 text-center\">\n        <span class=\"hl-yellow text-sm\">Global Table routes the allocator ➔ Local Bitmap commits the units.</span>\n      </div>\n    "
  },
  {
    "id": 12,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Deep Dive: Zone Summary Struct (zone_summary_disk_t)",
    "subtitle": "24-Byte Compact Cache Entry for Instant Allocation Routing",
    "badge": "STRUCT ANATOMY",
    "quote": "32 cached summaries in the Superblock allow the kernel to find free space without touching a single bitmap page on disk.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-green\"><span class=\"pixel-heart\"></span> ON-DISK STRUCT: <code>zone_summary_disk_t</code> (24 Bytes per Zone)</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Field Name</th>\n              <th>Type</th>\n              <th>Size</th>\n              <th>Offset</th>\n              <th>Dynamic Role in Space Discovery</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>zone_id</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x00..0x03</code></td>\n              <td>Target zone index ($0 \\dots 31$).</td>\n            </tr>\n            <tr>\n              <td><code>free_units</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x04..0x07</code></td>\n              <td>Total unallocated 512-byte units remaining in this zone.</td>\n            </tr>\n            <tr>\n              <td><code>largest_free_run</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x08..0x0B</code></td>\n              <td>Maximum contiguous sequence of free 512B units (Instant contiguity check).</td>\n            </tr>\n            <tr>\n              <td><code>total_units</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x0C..0x0F</code></td>\n              <td>Total assignable data units in this zone (<code>1,912</code> units in 32MB default).</td>\n            </tr>\n            <tr>\n              <td><code>znode_used</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x10..0x13</code></td>\n              <td>Count of active Z-Nodes in this zone ($0 \\dots 32$). Used for cross-zone spillover.</td>\n            </tr>\n            <tr>\n              <td><code>reserved</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x14..0x17</code></td>\n              <td>Reserved boundary alignment & Next-Fit wear-leveling state.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    <div class=\"undertale-grid-2 mt-2\">\n      <div class=\"battle-card green-theme\">\n        <div class=\"card-title hl-green\">⚡ TOTAL SUMMARY SIZE</div>\n        <p class=\"text-xs\">32 Zones &times; 24 Bytes = <strong>768 Bytes Total</strong> (Embedded in Superblock <code>0x0034</code>).</p>\n      </div>\n      <div class=\"battle-card cyan-theme\">\n        <div class=\"card-title hl-cyan\">🎯 O(1) ALLOCATION ROUTING</div>\n        <p class=\"text-xs\">Identifies contiguous extents in 0 milliseconds without reading disk bitmap blocks.</p>\n      </div>\n    </div>\n    "
  },
  {
    "id": 13,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 2C: WAL Transaction Journal (Pages 1..512)",
    "subtitle": "2.0 MB Sector-Aligned Circular Log for Atomic Crash Consistency",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header hl-red\"><span class=\"pixel-star\">★</span> WAL TRANSACTION JOURNAL REGION (PAGES 1..512)</div>\n        <div class=\"ascii-block text-xs\">\nPAGES 1 TO 512 (2,097,152 Bytes / 2.0 MB):\n┌──────────────┬──────────────┬──────────────┬──────────────┬───────────────────┐\n│ Page 1 (4KB) │ Page 2 (4KB) │ Page 3 (4KB) │ Page 4 (4KB) │ Page 512 (4KB)    │\n│ Record Tx#1  │ Record Tx#2  │ Record Tx#3  │ Record Tx#4  │ Record Tx#512 ... │\n└──────────────┴──────────────┴──────────────┴──────────────┴───────────────────┘\n▲ 512 Dedicated 4KB Pages              ▲ Magic 0x4A524E31 (\"JRN1\")\n        </div>\n      </div>\n      <div class=\"grid-3-col mt-2\">\n        <div class=\"feature-card cyan-border\">\n          <div class=\"feature-title hl-cyan\">1. CIRCULAR LOG</div>\n          <p class=\"feature-desc\">512 pre-allocated 4KB pages wrapped circularly via <code>superblock.journal_head</code>.</p>\n        </div>\n        <div class=\"feature-card yellow-border\">\n          <div class=\"feature-title hl-yellow\">2. SECTOR ALIGNED</div>\n          <p class=\"feature-desc\">Every record is exactly 4,096 bytes, preventing partial torn writes during power loss.</p>\n        </div>\n        <div class=\"feature-card green-border\">\n          <div class=\"feature-title hl-green\">3. &lt; 5 ms REPLAY</div>\n          <p class=\"feature-desc\">Boot recovery scans monotonic TxIDs and reapplies uncommitted deltas in milliseconds.</p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 14,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 3: Partitioning into 32 Autonomous Zones",
    "subtitle": "Dividing 7,679 Usable Pages into Self-Contained 1 MB Storage Domains",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header hl-cyan\"><span class=\"pixel-heart\"></span> 32 AUTONOMOUS STORAGE NEIGHBORHOODS</div>\n        <div class=\"ascii-block text-xs\">\nPAGES 513 TO 8191 (7,679 Usable Pages / 30.7 MB):\n┌────────────────┬────────────────┬────────────────┬───────────────────────────┐\n│     ZONE 0     │     ZONE 1     │     ZONE 2     │        ZONE 31            │\n│ Pages 513..782 │ Pages 783..1021│Pages 1022..1260│    Pages 7953..8191       │\n│ (270 Pages)    │ (239 Pages)    │ (239 Pages)    │    (239 Pages)            │\n└────────────────┴────────────────┴────────────────┴───────────────────────────┘\n        </div>\n      </div>\n      <div class=\"grid-3-col mt-2\">\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title hl-cyan\">DOMAIN ISOLATION</div>\n          <p class=\"text-xs\">Each zone acts as an independent storage neighborhood with its own metadata and bitmaps.</p>\n        </div>\n        <div class=\"battle-card yellow-theme\">\n          <div class=\"card-title hl-yellow\">PARALLEL SCALING</div>\n          <p class=\"text-xs\">Eliminates single global lock bottlenecks. Writes in Zone 1 do not block Zone 8.</p>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title hl-green\">WEAR LEVELING</div>\n          <p class=\"text-xs\">Next-Fit roving cursors sweep writes across zones, extending flash lifespan by &gt;300%.</p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 15,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 4: Inside a Zone — Regional Internal Architecture",
    "subtitle": "The 4 Internal On-Disk Layers of Every Local Domain",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header\">ZONE N INTERNAL ON-DISK LAYOUT</div>\n          <div class=\"ascii-block text-xs\">\n                    ZONE N INTERNAL\n┌─────────────────────────────────────────────────────┐\n│ Page 0 (4 KB)  ➔ Zone Header (0x5A4F4E45)           │\n├─────────────────────────────────────────────────────┤\n│ Pages 1..4     ➔ Z-Node Table (32 Slots x 512B)     │\n├─────────────────────────────────────────────────────┤\n│ Page 5 (4 KB)  ➔ Local Allocation Bitmap (512B/bit) │\n├─────────────────────────────────────────────────────┤\n│ Units 48..N-1  ➔ Physical Data Units Region         │\n│ [data][free][data][data][free][free][data]          │\n└─────────────────────────────────────────────────────┘\n          </div>\n        </div>\n        <div class=\"feature-card-list\">\n          <div class=\"feature-card cyan-border\">\n            <div class=\"feature-title hl-cyan\">1. ZONE HEADER (Page 0)</div>\n            <p class=\"feature-desc\">Defines local boundaries, unit counts, and bitmap dimensions.</p>\n          </div>\n          <div class=\"feature-card purple-border\">\n            <div class=\"feature-title hl-purple\">2. Z-NODES (Pages 1..4)</div>\n            <p class=\"feature-desc\">32 packed 512-byte metadata containers co-located in the zone.</p>\n          </div>\n          <div class=\"feature-card yellow-border\">\n            <div class=\"feature-title hl-yellow\">3. LOCAL BITMAP (Page 5)</div>\n            <p class=\"feature-desc\">256-byte bitmap tracking free/allocated status for local 512B units.</p>\n          </div>\n          <div class=\"feature-card green-border\">\n            <div class=\"feature-title hl-green\">4. DATA UNITS (Units 48..N)</div>\n            <p class=\"feature-desc\">Physical storage units holding user files, directories, and extents.</p>\n          </div>\n        </div>\n      </div>\n    "
  },
  {
    "id": 16,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Deep Dive: Zone Header Struct (zone_header_disk_t)",
    "subtitle": "4,096-Byte Master Descriptor Defining Local Zone Geometry",
    "badge": "STRUCT ANATOMY",
    "quote": "Every zone begins with an authoritative 4KB header defining its internal geometry, bitmap boundaries, and Z-Node slots.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-cyan\"><span class=\"pixel-heart\"></span> ON-DISK STRUCT: <code>zone_header_disk_t</code> (4,096 Bytes / Page 0 of Zone)</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Field Name</th>\n              <th>C Data Type</th>\n              <th>Size</th>\n              <th>Byte Offset</th>\n              <th>Architectural Role & Value Stored</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>magic</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x00..0x03</code></td>\n              <td>Zone validation signature: <code>0x5A4F4E45</code> (ASCII <code>\"ZONE\"</code>).</td>\n            </tr>\n            <tr>\n              <td><code>version</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x04..0x07</code></td>\n              <td>Zone layout version (Version <code>2</code>).</td>\n            </tr>\n            <tr>\n              <td><code>zone_id</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x08..0x0B</code></td>\n              <td>Physical zone index on disk ($0 \\dots 31$).</td>\n            </tr>\n            <tr>\n              <td><code>total_units</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x0C..0x0F</code></td>\n              <td>Total 512B allocation units in this zone (<code>1,912</code> units in 32MB profile).</td>\n            </tr>\n            <tr>\n              <td><code>data_first_unit</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x10..0x13</code></td>\n              <td>Unit index where user data begins (Unit <code>48</code> after header, znodes, bitmap).</td>\n            </tr>\n            <tr>\n              <td><code>bitmap_bytes</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x14..0x17</code></td>\n              <td>Byte length of allocation bitmap (<code>total_units / 8</code> = <code>256 B</code>).</td>\n            </tr>\n            <tr>\n              <td><code>znode_slots</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x18..0x1B</code></td>\n              <td>Localized Z-Node slots reserved in this zone (<code>32</code> slots = 4 pages).</td>\n            </tr>\n            <tr>\n              <td><code>flags</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x1C..0x1F</code></td>\n              <td>Zone capability flags (Read-Only, Flash-Optimized, Journal-Target).</td>\n            </tr>\n            <tr>\n              <td><code>padding[]</code></td>\n              <td><code>uint8_t[4064]</code></td>\n              <td><span class=\"pill-badge hl-purple\">4,064 B</span></td>\n              <td><code>0x20..0xFFF</code></td>\n              <td>Zero-fill padding to align header to exactly 1 Physical Page (4,096 B).</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    "
  },
  {
    "id": 17,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 5: The 4 KiB Page — Universal Physical I/O Currency",
    "subtitle": "How the 4,096-Byte Page Bridges Z-Nodes, Units, Extents, and Directories",
    "badge": "I/O CURRENCY",
    "quote": "The 4 KiB Page is the atomic heartbeat of physical disk transfers, unifying metadata, allocation units, and directory records.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-cyan\"><span class=\"pixel-heart\"></span> THE 4 KiB PAGE: THE UNIVERSAL PHYSICAL I/O CURRENCY</div>\n      <p class=\"text-xs\">\n        In AuraFS, all disk reads and writes operate on <strong>4,096-Byte (4 KiB) Pages</strong> (<code>UFS_BLOCK_SIZE = 4096 B</code>). This aligns with CPU MMU memory pages, DMA burst transfers, and SPI/NAND flash programming boundaries.\n      </p>\n    </div>\n    <div class=\"matrix-table-wrapper mt-2\">\n      <table class=\"pixel-table text-xs\">\n        <thead>\n          <tr>\n            <th>Structure Domain</th>\n            <th>Single Element Size</th>\n            <th>Elements Per 4 KiB Page</th>\n            <th>Role in the Filesystem Hierarchy</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong class=\"hl-purple\">Z-Node Table</strong></td>\n            <td>512 Bytes</td>\n            <td><strong class=\"hl-yellow\">8 Z-Nodes / Page</strong></td>\n            <td>Authoritative file metadata & extent containers (32 slots = 4 pages).</td>\n          </tr>\n          <tr>\n            <td><strong class=\"hl-cyan\">Physical Units</strong></td>\n            <td>512 Bytes</td>\n            <td><strong class=\"hl-yellow\">8 Units / Page</strong></td>\n            <td>Base allocation accounting unit. 1 Medium Extent = Exactly 1 Page (4KB).</td>\n          </tr>\n          <tr>\n            <td><strong class=\"hl-green\">Directory Entries</strong></td>\n            <td>64 Bytes</td>\n            <td><strong class=\"hl-yellow\">64 Dirents / Page</strong></td>\n            <td>Path resolution records (8 entries per 512B block ➔ 64 per full page).</td>\n          </tr>\n          <tr>\n            <td><strong class=\"hl-orange\">Overflow Extents</strong></td>\n            <td>512 Bytes / Page</td>\n            <td><strong class=\"hl-yellow\">17 Extents / Page</strong></td>\n            <td>Indirect extent chaining for files exceeding 16 primary extents (<code>0x45585047</code>).</td>\n          </tr>\n          <tr>\n            <td><strong class=\"hl-gold\">Extended Attributes</strong></td>\n            <td>512 Bytes / Page</td>\n            <td><strong class=\"hl-yellow\">5 Entries / Page</strong></td>\n            <td>Key-value metadata pool (24B key, 64B val) via <code>0x58415452</code> pages.</td>\n          </tr>\n          <tr>\n            <td><strong class=\"hl-red\">Journal Records</strong></td>\n            <td>4,096 Bytes</td>\n            <td><strong class=\"hl-yellow\">1 Record / Page</strong></td>\n            <td>Atomic sector-aligned transaction updates across power failures (<code>0x4A524E31</code>).</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    "
  },
  {
    "id": 18,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 6A: Local Free Space — 512-Byte Unit Bitmap",
    "subtitle": "Zone Page 5: Precise 256-Byte Binary Allocation Map",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-yellow\">LOCAL BITMAP ARCHITECTURE (PAGE 5)</div>\n          <div class=\"ascii-block text-xs\">\nZONE BITMAP (256 Bytes = 2,048 bits):\n[11111111 11111111 11111111 11111111] (Units 0..31 Reserved for Meta)\n[11111111 11111111 00000000 00000000] (Units 32..47 Reserved, 48.. Free)\n                   ▲\n                   Unit 48: First assignable user data unit\n          </div>\n        </div>\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title hl-cyan\">⚡ 64-BIT HARDWARE SCANNING</div>\n          <ul class=\"pixel-list text-xs\">\n            <li><strong>Bitwise Word Casting:</strong> Checks 64 units (32 KiB) in a single CPU register instruction.</li>\n            <li><strong>CTZLL Hardware Acceleration:</strong> <code>__builtin_ctzll(~word)</code> finds free unit in 1 cycle.</li>\n            <li><strong>Zero Global Lock:</strong> Bitmap modifications only lock the local zone.</li>\n          </ul>\n        </div>\n      </div>\n    "
  },
  {
    "id": 19,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 6B: Local Metadata — Z-Node Table Region",
    "subtitle": "Zone Pages 1..4: 32 Dedicated 512-Byte Inode Slots",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card purple-theme\">\n          <div class=\"card-title hl-purple\">Z-NODE TABLE SLOTS (32 SLOTS)</div>\n          <div class=\"ascii-block text-xs\">\nPAGES 1..4 (16 KB = 32 Slots x 512B):\n├── Slot 0:  RESERVED (Null / Tombstone)\n├── Slot 1:  Z-Node #1 (\"README.txt\")\n├── Slot 2:  Z-Node #2 (\"kernel.bin\")\n└── Slot 31: Z-Node #31 (Max Local File)\n          </div>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title hl-green\">★ CO-LOCATED ZERO SEEK PENALTY</div>\n          <p class=\"text-xs\">\n            In traditional systems, reading metadata requires seeking to the disk front (LBA 32), then seeking to the disk back (LBA 500,000) for data.\n          </p>\n          <p class=\"text-xs hl-yellow mt-1\">\n            In AuraFS, the Z-Node and its data units live within the <strong>same 1 MB zone</strong> (0 seek latency!).\n          </p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 20,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Level 6C: Micro Physical Data Units Region (Units 48..N-1)",
    "subtitle": "The 512-Byte Base Allocation Unit Neighborhood",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header hl-green\"><span class=\"pixel-heart\"></span> DATA UNITS REGION (UNITS 48 TO N-1)</div>\n        <div class=\"ascii-block text-xs\">\nDATA REGION (Units 48..1911 in 32MB profile):\n┌──────────────┬──────────────┬──────────────┬──────────────┬───────────────────┐\n│ Unit 48      │ Unit 49      │ Unit 50      │ Unit 51      │ Unit 1911         │\n│ [Payload A]  │ [Payload A]  │ [Dir Record] │ [Tier-0 Inl] │ [Overflow EXPG]   │\n└──────────────┴──────────────┴──────────────┴──────────────┴───────────────────┘\n▲ Starting Data Unit 48               ▲ 512-Byte Base Accounting Unit\n        </div>\n      </div>\n      <div class=\"grid-3-col mt-2\">\n        <div class=\"feature-card cyan-border\">\n          <div class=\"feature-title hl-cyan\">1. REGULAR FILES</div>\n          <p class=\"feature-desc\">Stores raw user byte streams across contiguous or multi-extent unit spans.</p>\n        </div>\n        <div class=\"feature-card yellow-border\">\n          <div class=\"feature-title hl-yellow\">2. DIRECTORIES</div>\n          <p class=\"feature-desc\">Stores 64-byte <code>dir_disk_t</code> entries (8 entries per 512B unit block).</p>\n        </div>\n        <div class=\"feature-card orange-border\">\n          <div class=\"feature-title hl-orange\">3. OVERFLOW CHAINS</div>\n          <p class=\"feature-desc\">Stores chained <code>extent_page_disk_t</code> (17 extents per 512B unit page).</p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 21,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Locality vs. Ownership: Preferred Home vs. Cross-Zone Spans",
    "subtitle": "How Files Scale Across Domain Boundaries without Performance Loss",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\">CROSS-ZONE EXTENT MAPPING DECOUPLING</div>\n        <div class=\"ascii-block text-xs\">\n       ZONE 2 (Home Zone)                             ZONE 5 (Secondary Zone)\n┌───────────────────────────────────────┐     ┌───────────────────────────────────────┐\n│ Z-NODE #42 (\"video.dat\")              │     │                                       │\n│  ├─ Extent 0 → Zone 2, Units 48..147  │     │                                       │\n│  ├─ Extent 1 → Zone 2, Units 200..299 │     │                                       │\n│  └─ Extent 2 ─────────────────────────┼─────┼─► Zone 5, Units 48..147               │\n└───────────────────────────────────────┘     └───────────────────────────────────────┘\n  ▲ METADATA & PREFERRED HOME                   ▲ SECONDARY DATA EXTENT\n        </div>\n      </div>\n      <div class=\"grid-3-col mt-2\">\n        <div class=\"feature-card cyan-border\">\n          <div class=\"feature-title hl-cyan\">LOCALITY</div>\n          <p class=\"feature-desc\">Where metadata is placed (Home Zone).</p>\n        </div>\n        <div class=\"feature-card yellow-border\">\n          <div class=\"feature-title hl-yellow\">MAPPING</div>\n          <p class=\"feature-desc\">Where extents physically reside.</p>\n        </div>\n        <div class=\"feature-card green-border\">\n          <div class=\"feature-title hl-green\">OWNERSHIP</div>\n          <p class=\"feature-desc\">Which file's Z-Node owns the units.</p>\n        </div>\n      </div>\n      <p class=\"hl-yellow mt-1 text-center text-xs\">\"The Z-Node tells us who owns the data. The extent list tells us where the data actually lives.\"</p>\n    "
  },
  {
    "id": 22,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Hierarchical Traversal: From Global Area Down to Base Unit",
    "subtitle": "The Macro-to-Micro Path of a Single File Allocation",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\"><span class=\"pixel-star\">★</span> COMPLETE 6-TIER ALLOCATION TRAVERSAL PIPELINE</div>\n        <div class=\"pipeline-vertical text-xs\">\n          <div class=\"pipe-row\"><strong>1. Query Global Superblock Summary (RAM):</strong> Check <code>largest_free_run</code> in 768B cache.</div>\n          <div class=\"pipe-row\"><strong>2. Route to Target Zone:</strong> Select Home Zone if space exists, else select best sibling zone.</div>\n          <div class=\"pipe-row\"><strong>3. Read Zone Header (Page 0):</strong> Fetch <code>data_first_unit</code> and <code>bitmap_bytes</code>.</div>\n          <div class=\"pipe-row\"><strong>4. Scan Local Bitmap (Page 5):</strong> Locate exact 512B physical units using 64-bit CTZLL instruction.</div>\n          <div class=\"pipe-row\"><strong>5. Claim Z-Node Slot (Pages 1..4):</strong> Write file metadata and populate 28B extent descriptor.</div>\n          <div class=\"pipe-row\"><strong>6. Commit Data Units (Units 48..N):</strong> Write payload bytes and flush WAL transaction.</div>\n        </div>\n      </div>\n    "
  },
  {
    "id": 23,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Mathematical Sizing Derivations & Standard Profiles",
    "subtitle": "Deterministic Storage Geometry from 8 MB to 256 MB",
    "quote": "Mathematical derivations establish deterministic page boundaries across all virtual disk image sizes.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-cyan\"><span class=\"pixel-star\">★</span> STORAGE GEOMETRY MATHEMATICAL SIZING DERIVATIONS</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Image Size</th>\n              <th>Total 4KB Pages</th>\n              <th>Journal Pages</th>\n              <th>Zone Count</th>\n              <th>Pages / Zone</th>\n              <th>Units / Zone (512B)</th>\n              <th>Max File Objects</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr><td><strong>8 MB (Min)</strong></td><td>2,048 Pages</td><td>512 (2.0 MB)</td><td>32 Zones</td><td>47 Pages</td><td>376 Units (188 KB)</td><td><strong>992 Files</strong></td></tr>\n            <tr><td><strong>16 MB</strong></td><td>4,096 Pages</td><td>512 (2.0 MB)</td><td>32 Zones</td><td>111 Pages</td><td>888 Units (444 KB)</td><td><strong>992 Files</strong></td></tr>\n            <tr><td><strong class=\"hl-yellow\">32 MB (Default)</strong></td><td>8,192 Pages</td><td>512 (2.0 MB)</td><td>32 Zones</td><td>239 Pages</td><td>1,912 Units (956 KB)</td><td><strong>992 Files</strong></td></tr>\n            <tr><td><strong>64 MB</strong></td><td>16,384 Pages</td><td>512 (2.0 MB)</td><td>32 Zones</td><td>495 Pages</td><td>3,960 Units (1.98 MB)</td><td><strong>992 Files</strong></td></tr>\n            <tr><td><strong>128 MB</strong></td><td>32,768 Pages</td><td>512 (2.0 MB)</td><td>32 Zones</td><td>1,007 Pages</td><td>8,056 Units (4.02 MB)</td><td><strong>992 Files</strong></td></tr>\n            <tr><td><strong>256 MB</strong></td><td>65,536 Pages</td><td>512 (2.0 MB)</td><td>32 Zones</td><td>2,031 Pages</td><td>16,248 Units (8.12 MB)</td><td><strong>992 Files</strong></td></tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    <div class=\"undertale-box mt-2\">\n      <div class=\"ascii-block text-xs\">\n1. P_total = size / 4096 (e.g. 32MB = 8,192 Pages)    2. Journal = Pages 1..512 (2 MB circular WAL)\n3. P_usable = P_total - 513 = 7,679 Pages for Zones    4. P_zone = P_usable / 32 = 239 Pages/Zone (+31 to Z0)\n      </div>\n    </div>\n    "
  },
  {
    "id": 24,
    "chapter": "Chapter 2: Disk Layout",
    "zone": "snowdin",
    "zoneName": "Zone 01: Snowdin Forest",
    "title": "Architectural Advantages of the Hierarchical Layout",
    "subtitle": "Four Concrete System Wins & Engineered Trade-Off Solutions",
    "content": "\n      <div class=\"grid-2x2\">\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title hl-cyan\">1. ZERO SEEK LOCALITY</div>\n          <p class=\"text-xs\">Metadata, bitmaps, and data units are co-located in the same 1MB zone, eliminating cross-disk traversal latency.</p>\n        </div>\n        <div class=\"battle-card yellow-theme\">\n          <div class=\"card-title hl-yellow\">2. 32x CONCURRENT SCALING</div>\n          <p class=\"text-xs\">32 autonomous local bitmaps replace the single global lock, enabling concurrent multi-threaded write pipelines.</p>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title hl-green\">3. +300% FLASH LONGEVITY</div>\n          <p class=\"text-xs\">Roving Next-Fit cursors sweep circularly across zones, eliminating sector burnout on early flash sectors.</p>\n        </div>\n        <div class=\"battle-card orange-theme\">\n          <div class=\"card-title hl-orange\">4. BOUNDED BLAST RADIUS</div>\n          <p class=\"text-xs\">Physical corruption or decay in one zone remains completely isolated without risking volume-wide loss.</p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 25,
    "chapter": "Comparison: Disk Layout",
    "zone": "blizzard",
    "zoneName": "Frostfire: FAT32 vs AuraFS",
    "title": "FAT32 vs. AuraFS: Disk Layout & Locality",
    "subtitle": "Monolithic Global Bottleneck vs. Hierarchical Autonomous Storage Domains",
    "badge": "IN-DEPTH ARCHITECTURAL ARENA",
    "quote": "FAT32 concentrates all metadata at the volume start, causing extreme head thrashing, single-lock bottlenecks, and flash sector burnout. AuraFS co-locates metadata, bitmaps, and data in 32 autonomous zones.",
    "content": "\n    <div class=\"undertale-grid-2\">\n      <div class=\"battle-card cyan-theme\">\n        <div class=\"card-title hl-cyan\">❄️ FAT32 MONOLITHIC DISK LAYOUT</div>\n        <div class=\"ascii-block text-xs\">\n┌──────────┬──────────┬──────────┬──────────────┬──────────────────┐\n│Reserved  │  FAT 1   │  FAT 2   │  Root Dir    │   DATA CLUSTERS  │\n│(Boot+BPB)│(Global)  │(Mirror)  │ (32B Dirent) │ (Clusters 2..N)  │\n└──────────┴──────────┴──────────┴──────────────┴──────────────────┘\n▲ Front of Disk (LBA 0..1024)            ▲ Back of Disk (Gigabytes away)\n        </div>\n        <ul class=\"pixel-list text-xs mt-1\">\n          <li><strong class=\"hl-red\">Severe Seek Latency:</strong> FAT metadata sits at LBA 32 while data clusters live hundreds of gigabytes away.</li>\n          <li><strong class=\"hl-red\">Global Lock Contention:</strong> Every cluster allocation serializes on the same monolithic FAT table.</li>\n          <li><strong class=\"hl-red\">Flash Wear Hotspot:</strong> FAT1/FAT2 sectors 32..1024 are rewritten millions of times, causing rapid flash cell burnout.</li>\n        </ul>\n      </div>\n      <div class=\"battle-card orange-theme\">\n        <div class=\"card-title hl-orange\">🔥 AURAFS 32-ZONE LOCALIZED ARCHITECTURE</div>\n        <div class=\"ascii-block text-xs\">\n┌──────────────────────────────────────────────────────────────────┐\n│ GLOBAL AREA: Superblock (Page 0) │ WAL Journal (Pages 1..512)    │\n├──────────────┬──────────────┬──────────────┬─────────────────────┤\n│    ZONE 0    │    ZONE 1    │    ZONE 2    │    ZONE 31 ...      │\n│Hdr|ZNode|BM|D│Hdr|ZNode|BM|D│Hdr|ZNode|BM|D│Hdr|ZNode|Bitmap|Data│\n└──────────────┴──────────────┴──────────────┴─────────────────────┘\n▲ Page 0 Master Bootstrap               ▲ 32 Autonomous 1MB Domains\n        </div>\n        <ul class=\"pixel-list text-xs mt-1\">\n          <li><strong class=\"hl-green\">Co-Located Locality:</strong> Z-Node, 512B bitmap, and data units live within the same 1MB zone (0 seek penalty).</li>\n          <li><strong class=\"hl-green\">Parallel Scaling:</strong> 32 autonomous zones eliminate global allocation lock bottlenecks completely.</li>\n          <li><strong class=\"hl-green\">Cyclic Next-Fit Cursor:</strong> Roving cursors sweep writes evenly across zones, increasing flash lifespan by >300%.</li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"undertale-box mt-2\">\n      <div class=\"box-header hl-yellow\"><span class=\"pixel-star\">★</span> DEEP DIVE COMPARATIVE ARCHITECTURAL MATRIX</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Architectural Dimension</th>\n              <th>FAT32 (1977 Legacy Design)</th>\n              <th>AuraFS v2.0 (Micro-Kernel Zoned Design)</th>\n              <th>Architectural Advantage</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>On-Disk Organization</strong></td>\n              <td>Monolithic flat table; fixed front-heavy structure</td>\n              <td>32 Autonomous Zoned Domains + 2MB WAL Journal</td>\n              <td><span class=\"pill-badge hl-green\">Domain Isolation</span></td>\n            </tr>\n            <tr>\n              <td><strong>Head Traversal Distance</strong></td>\n              <td>Hundreds of megabytes to gigabytes per file I/O</td>\n              <td>Co-located within 1 MB local zone boundary</td>\n              <td><span class=\"pill-badge hl-green\">Zero Seek Penalty</span></td>\n            </tr>\n            <tr>\n              <td><strong>Allocation Concurrency</strong></td>\n              <td>Single global FAT table lock for all write operations</td>\n              <td>32 independent local zone allocation bitmaps</td>\n              <td><span class=\"pill-badge hl-green\">32x Parallel Scaling</span></td>\n            </tr>\n            <tr>\n              <td><strong>Flash Wear Endurance</strong></td>\n              <td>Severe FAT1/FAT2 sector burnout on flash storage</td>\n              <td>Deterministic Next-Fit cyclic roving cursor sweep</td>\n              <td><span class=\"pill-badge hl-green\">+300% Flash Longevity</span></td>\n            </tr>\n            <tr>\n              <td><strong>Small-File Storage Slack</strong></td>\n              <td>Consumes full 4KB–32KB cluster (&gt;99% wasted slack)</td>\n              <td>0 Bytes (Tier-0 Inline &le;384B) or 512B unit (&lt;5% slack)</td>\n              <td><span class=\"pill-badge hl-green\">Zero Tiny-File Slack</span></td>\n            </tr>\n            <tr>\n              <td><strong>Crash Recovery Mechanism</strong></td>\n              <td>None; power loss breaks FAT chains, requiring CHKDSK</td>\n              <td>Circular WAL Delta Journal with &lt;5 ms replay engine</td>\n              <td><span class=\"pill-badge hl-green\">Instant Recovery</span></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    "
  },
  {
    "id": 26,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Free Space Management: The Core Problem",
    "subtitle": "Tracking Available Storage with Zero Allocation Bottlenecks",
    "content": "\n      <div class=\"undertale-dialogue\">\n        <div class=\"dialogue-avatar avatar-soul\"></div>\n        <div class=\"dialogue-text\">\n          \"When a file needs more space, how does the filesystem know where it can put it?\"\n        </div>\n      </div>\n      <div class=\"undertale-grid-2 mt-3\">\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title\">CORE REQUIREMENTS</div>\n          <ul class=\"pixel-list text-xs\">\n            <li>Find free space fast ($O(1)$ lookup latency).</li>\n            <li>Locate contiguous chunks to avoid fragmentation.</li>\n            <li>Keep the free-space tracking structures compact.</li>\n          </ul>\n        </div>\n        <div class=\"battle-card yellow-theme\">\n          <div class=\"card-title\">AURAFS SOLUTION</div>\n          <ul class=\"pixel-list text-xs\">\n            <li>Local 512B-unit bitmap per zone (Page 5).</li>\n            <li>In-memory 24B summary table in Superblock.</li>\n            <li>64-bit word hardware bitwise scanning.</li>\n          </ul>\n        </div>\n      </div>\n    "
  },
  {
    "id": 27,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Traditional Methods: Free List vs. Bitmap",
    "subtitle": "Evaluating Classical Free Space Tracking Paradigms",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-orange\">TRADITIONAL #1: FREE LIST</div>\n          <div class=\"ascii-block text-xs\">\nFREE LIST: 100 ➔ 101 ➔ 102 ➔ 200 ➔ 201 ➔ 500 ➔ NULL\n          </div>\n          <p class=\"text-xs mt-2\"><strong>Pros:</strong> $O(1)$ to grab any block.</p>\n          <p class=\"text-xs hl-red\"><strong>Cons:</strong> No locality knowledge! Cannot easily detect contiguous runs.</p>\n        </div>\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-cyan\">TRADITIONAL #2: GLOBAL BITMAP</div>\n          <div class=\"ascii-block text-xs\">\nBITMAP: [11111100000011111111000000000000]\n         (1 = Used, 0 = Free)\n          </div>\n          <p class=\"text-xs mt-2\"><strong>Pros:</strong> Contiguity is visible as runs of 0s.</p>\n          <p class=\"text-xs hl-red\"><strong>Cons:</strong> Searching a 1TB drive's bitmap byte-by-byte takes millions of CPU cycles.</p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 28,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Our Design: Zone-Aware Free-Space Map",
    "subtitle": "Combining Local Bitmaps with Global Summary Acceleration",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title\">1. LOCAL BITMAP</div>\n          <p class=\"text-xs\">\"What is free?\" Exact 512B physical unit bit status.</p>\n          <div class=\"ascii-block text-xs mt-2\">\nbit_get(zone, idx)\nbit_set(zone, idx)\nbit_clear(zone, idx)\n          </div>\n        </div>\n        <div class=\"battle-card yellow-theme\">\n          <div class=\"card-title\">2. ZONE SUMMARY</div>\n          <p class=\"text-xs\">\"How much and how contiguous?\"</p>\n          <div class=\"ascii-block text-xs mt-2\">\nfree_units       ➔ Total free space\nlargest_free_run ➔ Best contiguous run\n          </div>\n        </div>\n      </div>\n      <div class=\"undertale-box mt-3\">\n        <div class=\"box-header\">ACCELERATION BENEFIT</div>\n        <p class=\"hl-green text-center text-xs\">Before reading a single bitmap block from disk, the allocator checks <code>largest_free_run</code> in the Superblock summary to see if the zone can satisfy the write in one contiguous extent!</p>\n      </div>\n    "
  },
  {
    "id": 29,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Summary in Action: Free Units vs. Largest Free Run",
    "subtitle": "Total Space Alone Does Not Guarantee Contiguity",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title\">ZONE 0 SUMMARY</div>\n          <div class=\"ascii-block text-xs\">\nBitmap = 00011100000011\nfree_units       = 9\nlargest_free_run = 6  ★★ (Ideal for medium file)\n          </div>\n        </div>\n        <div class=\"battle-card orange-theme\">\n          <div class=\"card-title\">ZONE 1 SUMMARY</div>\n          <div class=\"ascii-block text-xs\">\nBitmap = 01010101010101\nfree_units       = 7\nlargest_free_run = 1  (Severely fragmented)\n          </div>\n        </div>\n      </div>\n      <div class=\"undertale-box mt-3\">\n        <div class=\"box-header\">DECISION RULE</div>\n        <p class=\"hl-yellow text-xs\">\n          Both zones have free space, but Zone 0 can hold a 3 KiB file in <strong>one contiguous extent</strong>. Zone 1 would force <strong>multiple extent descriptors</strong>.\n        </p>\n      </div>\n    "
  },
  {
    "id": 30,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Advantages & Trade-Offs of Zone-Aware Free Space",
    "subtitle": "Fast Space Discovery vs. Summary Maintenance Overhead",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-green\">SYSTEM ADVANTAGES</div>\n          <ul class=\"pixel-list text-xs\">\n            <li><strong class=\"hl-cyan\">Compact State:</strong> 1 bit per 512B unit. Fast bitwise primitives.</li>\n            <li><strong class=\"hl-cyan\">Run Awareness:</strong> <code>largest_free_run</code> avoids scanning fragmented zones.</li>\n            <li><strong class=\"hl-cyan\">Zone Parallelism:</strong> Zone-isolated bitmaps allow concurrent multi-core writes.</li>\n          </ul>\n        </div>\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-yellow\">THE TRADE-OFF</div>\n          <ul class=\"pixel-list text-xs\">\n            <li><strong class=\"hl-orange\">Summary Update Cost:</strong> Every allocate/free updates <code>largest_free_run</code>.</li>\n            <li><strong class=\"hl-orange\">Design Answer:</strong> Summaries are cached in RAM and flushed during atomic transaction commit!</li>\n          </ul>\n        </div>\n      </div>\n    "
  },
  {
    "id": 31,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Metadata & Mapping: Inodes vs. Extents",
    "subtitle": "Moving from Block Pointers to Run-Length Encoded Extents",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card red-theme\">\n          <div class=\"card-title\">TRADITIONAL INODE</div>\n          <div class=\"ascii-block text-xs\">\ninode:\n  ├─ size, permissions, timestamps\n  ├─ Direct pointers [0..11]\n  ├─ Single indirect pointer ➔ [blocks]\n  ├─ Double indirect pointer ➔ [blocks]\n  └─ Triple indirect pointer ➔ [blocks]\n          </div>\n          <p class=\"text-xs mt-1 text-muted\">A 100 MB contiguous file needs 25,600 individual block pointers!</p>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title\">AURAFS Z-NODE + EXTENTS</div>\n          <div class=\"ascii-block text-xs\">\nznode_disk_t:\n  ├─ size, flags, timestamps, parent_id\n  ├─ xattr_page_id, overflow_id\n  └─ Extents Table (16 Descriptors):\n      ├─ Extent 0: (Z0, Unit 100, 200 units)\n      └─ Extent 1: (Z1, Unit 50,  400 units)\n          </div>\n          <p class=\"text-xs mt-1 hl-yellow\">A 100 MB contiguous file needs exactly ONE extent descriptor!</p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 32,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Our Z-Node: File Metadata Container + Zone Extents",
    "subtitle": "Authoritative Metadata Inode Tailored to Zoned Allocators",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\">Z-NODE FILE METADATA CONTAINER</div>\n        <p class=\"text-xs\">Our Z-Node is the authoritative file metadata container combined with extent-based mapping tailored to our zone allocator:</p>\n        <div class=\"grid-2x2 mt-2\">\n          <div class=\"feature-card cyan-border\">\n            <div class=\"feature-title hl-cyan\">1. FILE IDENTITY</div>\n            <p class=\"feature-desc\">Type (file/dir), flags (inline/LZ4), link_count, generation, timestamps.</p>\n          </div>\n          <div class=\"feature-card yellow-border\">\n            <div class=\"feature-title hl-yellow\">2. EXTENT LIST</div>\n            <p class=\"feature-desc\">16 embedded extent descriptors mapping logical byte spans to physical units.</p>\n          </div>\n          <div class=\"feature-card green-border\">\n            <div class=\"feature-title hl-green\">3. GRANULARITY TAG</div>\n            <p class=\"feature-desc\">Preferred granularity hint (512B / 4KB / 16KB) for future growth.</p>\n          </div>\n          <div class=\"feature-card orange-border\">\n            <div class=\"feature-title hl-orange\">4. OVERFLOW POINTERS</div>\n            <p class=\"feature-desc\">64-bit Object IDs linking to chained overflow extent pages and xattr pages.</p>\n          </div>\n        </div>\n      </div>\n    "
  },
  {
    "id": 33,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Deep Dive: Z-Node 512-Byte Packed Struct (znode_disk_t)",
    "subtitle": "Complete Byte-Level Layout of the Authoritative Metadata Inode",
    "badge": "STRUCT ANATOMY",
    "quote": "All file metadata, extended attributes, timestamps, and 16 primary extent descriptors fit inside a single 512-byte sector.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-purple\"><span class=\"pixel-heart\"></span> ON-DISK STRUCT: <code>znode_disk_t</code> (512 Bytes Packed)</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Field Name</th>\n              <th>C Data Type</th>\n              <th>Size</th>\n              <th>Byte Offset</th>\n              <th>Architectural Role & Description</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>magic</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x000..0x003</code></td>\n              <td>Z-Node validation signature: <code>0x5A4E4F44</code> (ASCII <code>\"ZNOD\"</code>).</td>\n            </tr>\n            <tr>\n              <td><code>type</code> / <code>flags</code></td>\n              <td><code>uint16_t[2]</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x004..0x007</code></td>\n              <td>Type (1=File, 2=Dir) & Flags (<code>0x0002</code>=Inline, <code>0x8000</code>=LZ4).</td>\n            </tr>\n            <tr>\n              <td><code>size</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-green\">8 B</span></td>\n              <td><code>0x008..0x00F</code></td>\n              <td>Logical file size in bytes (uncompressed length).</td>\n            </tr>\n            <tr>\n              <td><code>link_count</code> / <code>generation</code></td>\n              <td><code>uint32_t[2]</code></td>\n              <td><span class=\"pill-badge hl-cyan\">8 B</span></td>\n              <td><code>0x010..0x017</code></td>\n              <td>Hard link count (frees when 0) & NFS tombstone generation counter.</td>\n            </tr>\n            <tr>\n              <td><code>ctime, mtime, atime</code></td>\n              <td><code>uint64_t[3]</code></td>\n              <td><span class=\"pill-badge hl-cyan\">24 B</span></td>\n              <td><code>0x018..0x02F</code></td>\n              <td>Creation, Modification, and Access timestamps (Unix epoch seconds).</td>\n            </tr>\n            <tr>\n              <td><code>parent_id</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-green\">8 B</span></td>\n              <td><code>0x030..0x037</code></td>\n              <td>Compound Object ID of parent directory.</td>\n            </tr>\n            <tr>\n              <td><code>extent_count</code> / <code>local_id</code></td>\n              <td><code>uint16_t[2]</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x038..0x03B</code></td>\n              <td>Number of active direct extents (0..16) & slot index in home zone (1..31).</td>\n            </tr>\n            <tr>\n              <td><code>extent_overflow_id</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-green\">8 B</span></td>\n              <td><code>0x03C..0x043</code></td>\n              <td>Object ID of chained 512B overflow extent page (0x0000 if none).</td>\n            </tr>\n            <tr>\n              <td><code>xattr_page_id</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-green\">8 B</span></td>\n              <td><code>0x044..0x04B</code></td>\n              <td>Object ID of chained 512B extended attribute page (0x0000 if none).</td>\n            </tr>\n            <tr>\n              <td><code>extents[16] / inline</code></td>\n              <td><code>union (448 B)</code></td>\n              <td><span class=\"pill-badge hl-gold\">448 B</span></td>\n              <td><code>0x04C..0x20B</code></td>\n              <td><strong>Union:</strong> 16 &times; 28B Extents OR 384B Tier-0 Inline Data Payload.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    "
  },
  {
    "id": 34,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Deep Dive: Extent Descriptor Struct (ufs_extent_disk_t)",
    "subtitle": "28-Byte Run-Length Container Mapping Logical Byte Spans to Physical Storage",
    "badge": "STRUCT ANATOMY",
    "quote": "One 28-byte extent descriptor can map thousands of contiguous physical units across any zone on disk.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-cyan\"><span class=\"pixel-heart\"></span> ON-DISK STRUCT: <code>ufs_extent_disk_t</code> (28 Bytes Packed)</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Field Name</th>\n              <th>Data Type</th>\n              <th>Size</th>\n              <th>Byte Offset</th>\n              <th>Role & Description</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>logical_start</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">8 B</span></td>\n              <td><code>0x00..0x07</code></td>\n              <td>File byte offset where this extent begins (e.g. <code>0</code> or <code>16,384</code>).</td>\n            </tr>\n            <tr>\n              <td><code>logical_length</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">8 B</span></td>\n              <td><code>0x08..0x0F</code></td>\n              <td>Uncompressed logical length in bytes represented by this extent.</td>\n            </tr>\n            <tr>\n              <td><code>zone_id</code></td>\n              <td><code>uint16_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">2 B</span></td>\n              <td><code>0x10..0x11</code></td>\n              <td>Target zone index on disk ($0 \\dots 31$) where bytes physically reside.</td>\n            </tr>\n            <tr>\n              <td><code>granularity</code></td>\n              <td><code>uint16_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">2 B</span></td>\n              <td><code>0x12..0x13</code></td>\n              <td>Bit 15: <code>UFS_FLAG_COMPRESSED_LZ4</code> (0x8000), Bits 0..14: Base unit class.</td>\n            </tr>\n            <tr>\n              <td><code>physical_unit</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x14..0x17</code></td>\n              <td>Starting 512B physical unit index within target zone ($48 \\dots N-1$).</td>\n            </tr>\n            <tr>\n              <td><code>physical_units</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">4 B</span></td>\n              <td><code>0x18..0x1B</code></td>\n              <td>Total contiguous 512B physical units allocated on disk for this extent.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    <div class=\"undertale-grid-2 mt-2\">\n      <div class=\"battle-card cyan-theme\">\n        <div class=\"card-title hl-cyan\">⚡ RUN-LENGTH EFFICIENCY</div>\n        <p class=\"text-xs\">Single extent descriptor maps up to <strong>2 TB</strong> of contiguous storage in 28 bytes.</p>\n      </div>\n      <div class=\"battle-card green-theme\">\n        <div class=\"card-title hl-green\">🗜️ LZ4 COMPRESSION DECOUPLING</div>\n        <p class=\"text-xs\"><code>logical_length = 4096</code>, <code>physical_units = 1</code> (512B). Zero translation overhead!</p>\n      </div>\n    </div>\n    "
  },
  {
    "id": 35,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "The File Numbers Limit & Dynamic Cross-Zone Scaling",
    "subtitle": "Fixed Zone Slot Density + Chained Overflow Pages (17 Extents/Page)",
    "content": "\n    <div class=\"undertale-grid-2\">\n      <div class=\"battle-card red-theme\">\n        <div class=\"card-title hl-red\">⚠️ THE SYSTEM FILE LIMIT (992 FILES)</div>\n        <p class=\"text-xs\">\n          Each of the 32 zones provides <strong>32 Z-Node slots</strong> (Slot 0 reserved, Slots 1..31 usable).\n        </p>\n        <div class=\"ascii-block text-xs mt-2\">\n32 Zones &times; 31 Usable Slots = 992 Max Files\n        </div>\n        <p class=\"text-xs text-muted mt-1\">* High-density fixed-table architecture designed for deterministic microcontrollers.</p>\n      </div>\n      <div class=\"battle-card green-theme\">\n        <div class=\"card-title hl-green\">★ CHAINED OVERFLOW EXTENTS (EXPG)</div>\n        <p class=\"text-xs\">\n          If a file exceeds 16 extents, it links to chained 512B overflow pages (<code>extent_page_disk_t</code>, magic <code>0x45585047</code>).\n        </p>\n        <div class=\"ascii-block text-xs mt-2\">\n[Z-Node (16 Extents)] ➔ [Page 1 (17 Extents)] ➔ [Page 2...]\n        </div>\n        <p class=\"text-xs hl-yellow mt-1\">Files can grow to arbitrary fragmentation depth without table locks.</p>\n      </div>\n    </div>\n    "
  },
  {
    "id": 36,
    "chapter": "Chapter 3: Free Space & Z-Nodes",
    "zone": "waterfall",
    "zoneName": "Zone 02: Waterfall Caves",
    "title": "Two Sides of the Same Coin",
    "subtitle": "Free Space Bitmap vs. Extent Mapping Invariant",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title\">ZONE MAP SAYS</div>\n          <div class=\"ascii-block text-xs\">\n\"Here is where physical space\n exists on disk, and here is how\n contiguous that space is.\"\n          </div>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title\">Z-NODE EXTENT LIST SAYS</div>\n          <div class=\"ascii-block text-xs\">\n\"Here is the physical space\n currently owned by this file,\n mapped to logical offsets.\"\n          </div>\n        </div>\n      </div>\n      <div class=\"undertale-box mt-3 text-center\">\n        <div class=\"box-header\">THE ALLOCATION TRANSACTION INVARIANT</div>\n        <p class=\"hl-yellow text-xs\">\n          An allocation takes free units from the <strong>Zone Bitmap</strong> and appends them to the <strong>Z-Node Extent List</strong>.\n          A deletion returns extents from the <strong>Z-Node</strong> back to the <strong>Zone Bitmap</strong>.\n        </p>\n      </div>\n    "
  },
  {
    "id": 37,
    "chapter": "Comparison: Free Space & Metadata",
    "zone": "blizzard",
    "zoneName": "Frostfire: FAT32 vs AuraFS",
    "title": "FAT32 vs. AuraFS: Free Space & Metadata",
    "subtitle": "Chained Linked Lists vs. Run-Length Extents & Local Bitmaps",
    "content": "\n    <div class=\"undertale-grid-2\">\n      <div class=\"battle-card cyan-theme\">\n        <div class=\"card-title hl-cyan\">❄️ FAT32 FREE SPACE & MAPPING</div>\n        <div class=\"ascii-block text-xs\">\nFAT Table:\nCluster 10 ➔ 11 ➔ 12 ➔ 45 ➔ 0x0FFFFFFF (EOC)\nFree Cluster = 0x00000000\n        </div>\n        <ul class=\"pixel-list text-xs mt-1\">\n          <li><strong>Linked List Traversal:</strong> Seeking to 1 GB requires reading 262,144 FAT entries.</li>\n          <li><strong>No Contiguity Memory:</strong> Finding 10 free clusters requires scanning whole FAT.</li>\n        </ul>\n      </div>\n      <div class=\"battle-card orange-theme\">\n        <div class=\"card-title hl-orange\">🔥 AURAFS FREE SPACE & EXTENTS</div>\n        <div class=\"ascii-block text-xs\">\nZ-Node Extents:\nExtent 0: [0..1 GB] ➔ Zone 2, Units 100..2097252\nSummary: largest_free_run = 2097152\n        </div>\n        <ul class=\"pixel-list text-xs mt-1\">\n          <li><strong>O(1) Direct Seek:</strong> Multi-gigabyte spans resolved in 1 extent calculation.</li>\n          <li><strong>Contiguity Guaranteed:</strong> Summary table identifies multi-unit runs in 0ms.</li>\n        </ul>\n      </div>\n    </div>\n    "
  },
  {
    "id": 38,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "What Does Allocation Mean?",
    "subtitle": "The Allocator's Five Fundamental Decisions",
    "content": "\n  <div class=\"undertale-box\">\n    <div class=\"box-header\"><span class=\"pixel-heart\"></span> THE ALLOCATOR'S FIVE CORE DECISIONS</div>\n    <ul class=\"pixel-list text-sm\">\n      <li><span class=\"hl-cyan\">1. Space Sizing:</span> How much physical space to allocate?</li>\n      <li><span class=\"hl-yellow\">2. Target Zone:</span> Which localized zone to place it in?</li>\n      <li><span class=\"hl-green\">3. Physical Shape:</span> Single contiguous run or multi-extent chain?</li>\n      <li><span class=\"hl-orange\">4. Granularity Class:</span> 512B Fine Unit, 4KB Medium Page, or 16KB Large Extent?</li>\n      <li><span class=\"hl-purple\">5. Inline Optimization:</span> Can payload fit directly inside Z-Node (&le; 384 Bytes)?</li>\n    </ul>\n  </div>\n    "
  },
  {
    "id": 39,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "Standard Allocation Approaches",
    "subtitle": "Evaluating Contiguous vs. Scattered Allocation",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title\">1. CONTIGUOUS ALLOCATION</div>\n          <div class=\"ascii-block text-xs\">\nFile A: [Unit 10][Unit 11][Unit 12][Unit 13]\n          </div>\n          <p class=\"text-xs mt-2\">All blocks side-by-side in one physical span.</p>\n        </div>\n        <div class=\"battle-card yellow-theme\">\n          <div class=\"card-title\">2. SCATTERED ALLOCATION</div>\n          <div class=\"ascii-block text-xs\">\nFile A: [Unit 2] ... [Unit 89] ... [Unit 401]\n          </div>\n          <p class=\"text-xs mt-2\">Blocks scattered wherever free slots exist.</p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 40,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "Contiguous Allocation",
    "subtitle": "Maximum Sequential Performance & Descriptor Compactness",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-green\">ADVANTAGES</div>\n          <ul class=\"pixel-list text-xs\">\n            <li><strong class=\"hl-cyan\">Maximum Sequential Speed:</strong> Stream through data with zero seek latency.</li>\n            <li><strong class=\"hl-cyan\">Minimal Metadata:</strong> Represented by exactly ONE extent descriptor (start + length).</li>\n          </ul>\n        </div>\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-orange\">CHALLENGE</div>\n          <ul class=\"pixel-list text-xs\">\n            <li><strong class=\"hl-yellow\">External Fragmentation:</strong> Free space gets broken into small gaps over time.</li>\n            <li><strong class=\"hl-yellow\">Growth Collisions:</strong> If adjacent blocks are taken, file cannot expand in place.</li>\n          </ul>\n        </div>\n      </div>\n    "
  },
  {
    "id": 41,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "Scattered Allocation",
    "subtitle": "Zero External Fragmentation at the Cost of Seek Overhead",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-green\">ADVANTAGES</div>\n          <ul class=\"pixel-list text-xs\">\n            <li><strong class=\"hl-cyan\">No External Fragmentation:</strong> Any free block on disk can be consumed.</li>\n            <li><strong class=\"hl-cyan\">Easy Growth:</strong> Append new blocks anywhere without moving existing data.</li>\n          </ul>\n        </div>\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-red\">DISADVANTAGES</div>\n          <ul class=\"pixel-list text-xs\">\n            <li><strong class=\"hl-orange\">Severe Seek Penalties:</strong> Random head movement across fragmented blocks.</li>\n            <li><strong class=\"hl-orange\">Metadata Bloat:</strong> Requires massive pointer tables or chained extent lists.</li>\n          </ul>\n        </div>\n      </div>\n    "
  },
  {
    "id": 42,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "Our Allocation Principle",
    "subtitle": "Contiguous-First with Next-Fit Fragmentation Fallback",
    "quote": "Always try for contiguous space first. If unavailable, fall back to variable extents without stalling the application.",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\"><span class=\"pixel-star\">★</span> DUAL ALLOCATION PIPELINE</div>\n        <div class=\"ascii-block text-xs\">\nIncoming Write Request (e.g. 16 KB)\n              │\n              ▼\n    Check Home Zone Summary\n              │\n    ┌─────────┴─────────┐\n    ▼                   ▼\nContiguous Run Exists?  Fragmented Disk?\n    │                   │\n    ▼                   ▼\nALLOCATE 1 EXTENT   ALLOCATE MULTI-EXTENT CHAIN\n(Contiguous-First)  (Gather largest runs in Next-Fit order)\n        </div>\n      </div>\n    "
  },
  {
    "id": 43,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "First Allocation: Contiguous Case",
    "subtitle": "Ideal Single-Extent Mapping",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header hl-green\">ZONE 2: CLEAN DISK STATE</div>\n        <div class=\"ascii-block text-xs\">\nZONE 2 FREE SPACE: [ . . . . . . . . . . . . . . . . ] (All Free)\nIncoming File: \"data.bin\" (4 KB = 8 units)\nALLOCATION:    [ # # # # # # # # . . . . . . . . ]\n        </div>\n        <p class=\"hl-green mt-2 text-xs text-center\">Result: Extent 0 ➔ (Zone 2, Unit 48, Length 8 units). 100% Contiguous.</p>\n      </div>\n    "
  },
  {
    "id": 44,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "First Allocation: Fragmented Case",
    "subtitle": "Next-Fit Multi-Extent Gathering",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header hl-yellow\">ZONE 2: FRAGMENTED DISK STATE</div>\n        <div class=\"ascii-block text-xs\">\nZONE 2 FREE SPACE: [ # # # . . . # # # # . . # # ]\nIncoming File: \"log.txt\" (5 units needed)\nALLOCATION:\n  ├─ Extent 0 ➔ Zone 2, Units 51..53 (3 units)\n  └─ Extent 1 ➔ Zone 2, Units 58..59 (2 units)\n        </div>\n        <p class=\"hl-yellow mt-2 text-xs text-center\">Result: 2 Extents gathered in Next-Fit order. Zero external fragmentation stall!</p>\n      </div>\n    "
  },
  {
    "id": 45,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "What Is an Extent?",
    "subtitle": "Run-Length Encoded Contiguous Block Descriptor",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header hl-cyan\">ANATOMY OF AN EXTENT DESCRIPTOR</div>\n        <div class=\"ascii-block text-xs\">\n                 ufs_extent_disk_t (28 Bytes)\n┌─────────────────────────────────────────────────────────────┐\n│ logical_start:  0 B         (Start offset in logical file)  │\n│ logical_length: 4,096 B     (Byte length of data span)      │\n│ zone_id:        2           (Target physical zone)          │\n│ granularity:    4,096 B     (Unit size class / LZ4 flag)    │\n│ physical_unit:  48          (Starting 512B unit in zone)    │\n│ physical_units: 8           (Total 512B units allocated)    │\n└─────────────────────────────────────────────────────────────┘\n        </div>\n      </div>\n      <p class=\"hl-green mt-2 text-center text-xs\">Instead of storing 8 separate block numbers, we store ONE extent descriptor.</p>\n    "
  },
  {
    "id": 46,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "Multiple Extents, One File",
    "subtitle": "Continuous Logical Stream Across Discontinuous Physical Runs",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\">LOGICAL FILE WITH 3 EXTENTS</div>\n        <div class=\"ascii-block text-xs\">\nLOGICAL STREAM:  [ 0 KB ... 16 KB ] [ 16 KB ... 48 KB ] [ 48 KB ... 64 KB ]\n                        │                    │                   │\n                        ▼                    ▼                   ▼\nPHYSICAL EXTENT:  Extent 0 (Zone 2)   Extent 1 (Zone 2)   Extent 2 (Zone 5)\n                 Units 48..79        Units 120..183      Units 48..79\n        </div>\n      </div>\n      <p class=\"hl-yellow mt-2 text-center text-xs\">Application reads a smooth 64 KB byte stream; AuraFS maps the 3 extents transparently.</p>\n    "
  },
  {
    "id": 47,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "Why Multiple Physical Granularities?",
    "subtitle": "Eliminating the Classical File-Size Trade-Off",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card red-theme\">\n          <div class=\"card-title\">SINGLE FIXED GRANULARITY (4 KB)</div>\n          <div class=\"ascii-block text-xs\">\n100-byte file ➔ Allocates 4,096 B\nSlack Waste = 3,996 B (97.5% Wasted!)\n          </div>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title\">AURAFS VARIABLE GRANULARITY</div>\n          <div class=\"ascii-block text-xs\">\n100-byte file ➔ Tier-0 Inline (0 B wasted)\n500-byte file ➔ 512B Unit (12 B wasted)\n16KB file     ➔ 16KB Extent (0 B wasted)\n          </div>\n        </div>\n      </div>\n    "
  },
  {
    "id": 48,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "hotland",
    "zoneName": "Zone 03: Hotland Core",
    "title": "Our Allocation Granularities",
    "subtitle": "Three Right-Sized Physical Unit Classes",
    "content": "\n  <div class=\"matrix-table-wrapper\">\n    <table class=\"pixel-table text-sm\">\n      <thead>\n        <tr>\n          <th>File Request Size</th>\n          <th>Granularity Tier</th>\n          <th>Physical Allocation Size</th>\n          <th>512B Units</th>\n          <th>Target Use Case</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr><td><strong>0 &le; Size &le; 384 B</strong></td><td><span class=\"pill-badge hl-gold\">★ Tier-0 Inline</span></td><td><strong>0 Bytes</strong></td><td>0 units</td><td>Sensor tags, config files</td></tr>\n        <tr><td><strong>&le; 512 B</strong></td><td><span class=\"pill-badge hl-cyan\">Small Unit</span></td><td><strong>512 Bytes</strong></td><td>1 unit</td><td>Small telemetry records</td></tr>\n        <tr><td><strong>513 B to 4 KiB</strong></td><td><span class=\"pill-badge hl-yellow\">Medium Page</span></td><td><strong>4,096 Bytes</strong></td><td>8 units</td><td>Documents, JSON logs</td></tr>\n        <tr><td><strong>&gt; 4 KiB</strong></td><td><span class=\"pill-badge hl-green\">Large Extent</span></td><td><strong>16,384 Bytes</strong></td><td>32 units</td><td>Firmware binaries, images</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"undertale-box mt-2\">\n    <p class=\"hl-green text-center text-xs\">Fine granularity for small files prevents slack waste; coarse granularity for large files prevents extent table overflow.</p>\n  </div>\n    "
  },
  {
    "id": 49,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "Granularity Can Change as a File Grows",
    "subtitle": "Dynamic Tier Promotion Over Lifecycle",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\"><span class=\"pixel-heart\"></span> LIFETIME GRANULARITY PROMOTION PIPELINE</div>\n        <div class=\"pipeline-vertical text-xs\">\n          <div class=\"pipe-row\"><strong>1. Birth (100 Bytes):</strong> Stored as <strong>Tier-0 Inline Data</strong> inside Z-Node (0 data blocks).</div>\n          <div class=\"pipe-row\"><strong>2. Append (500 Bytes):</strong> Automatically promoted to <strong>512B Unit Extent</strong>.</div>\n          <div class=\"pipe-row\"><strong>3. Expansion (3 KiB):</strong> Allocated as <strong>4 KiB Page Extent</strong>.</div>\n          <div class=\"pipe-row\"><strong>4. Streaming (64 KiB):</strong> Grows using <strong>16 KiB Large Extents</strong>.</div>\n        </div>\n      </div>\n    "
  },
  {
    "id": 50,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "The 512-B Physical Accounting Unit",
    "subtitle": "Common Denominator for All Granularities",
    "content": "\n  <div class=\"undertale-grid-2\">\n    <div class=\"undertale-box\">\n      <div class=\"box-header\">UNIT CONVERSION FORMULA</div>\n      <div class=\"ascii-block text-xs\">\n512 B  = 1 unit  (Small)\n4 KiB  = 8 units (Medium)\n16 KiB = 32 units (Large)\n      </div>\n      <p class=\"text-xs mt-2 text-muted\">The physical disk and bitmap always count in 512-B base units.</p>\n    </div>\n    <div class=\"battle-card cyan-theme\">\n      <div class=\"card-title hl-cyan\">⚡ UNIFIED BITMAP</div>\n      <p class=\"text-xs\">\n        Because all granularities are exact integer multiples of 512B, a single bitmap tracks all allocations without fragmentation translation layers.\n      </p>\n    </div>\n  </div>\n    "
  },
  {
    "id": 51,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "Logical Size vs Physical Allocation",
    "subtitle": "Understanding Internal Slack",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\">LOGICAL DATA vs. PHYSICAL CAPACITY</div>\n        <p class=\"text-xs\">When a 3,000-byte file is allocated in a 4,096-byte medium extent:</p>\n        <div class=\"ascii-block text-xs mt-2\">\n┌─────────────────────────────────────────────────────────────┐\n│ Logical Data (3,000 Bytes)       │ Unused Slack (1,096 B)   │\n└─────────────────────────────────────────────────────────────┘\n▲                                  ▲                          ▲\nStart                              Logical End (EOF)          Physical End\n        </div>\n      </div>\n      <p class=\"hl-yellow mt-2 text-center text-xs\">Internal slack is already allocated to the file — subsequent appends reuse it without new disk allocations!</p>\n    "
  },
  {
    "id": 52,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "Reusing Existing Slack",
    "subtitle": "Zero-Allocation File Expansion",
    "content": "\n  <div class=\"undertale-box\">\n    <div class=\"box-header\">GROWTH WITHOUT NEW DISK ALLOCATION</div>\n    <p class=\"text-xs\">When a file grows from 1 KiB to 2 KiB inside a 4 KiB physical extent:</p>\n    <div class=\"ascii-block text-xs mt-2\">\n1 KiB Existing Data  +  1 KiB Reused Slack  =  2 KiB Total\nBitmap allocations: 0 | Extent descriptor updates: 0 | Metadata overhead: ZERO\n    </div>\n  </div>\n  <div class=\"battle-card green-theme mt-2\">\n    <div class=\"card-title hl-green\">★ ZERO-I/O SLACK REUSE ALGORITHM</div>\n    <p class=\"text-xs\">\n      AuraFS checks if <code>new_size &le; physical_units &times; 512</code>. If true, it updates <code>znode.size</code> in-place with zero bitmap I/O.\n    </p>\n  </div>\n    "
  },
  {
    "id": 53,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "Example: 18 KiB File",
    "subtitle": "Allocation in 16 KiB Granules & Granularity Limitation",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header hl-orange\">18 KiB STORAGE ALLOCATION BREAKDOWN</div>\n        <div class=\"ascii-block text-xs\">\nFile: 18 KiB (18,432 Bytes)\nAllocated in 16 KiB Granules ➔ Needs TWO 16 KiB Extents = 32 KiB Physical Space\n┌─────────────────────────────────────────────────────────────┐\n│ Extent 0: 16 KiB (Full) │ Extent 1: 2 KiB Used + 14 KiB Slack│\n└─────────────────────────────────────────────────────────────┘\n        </div>\n      </div>\n      <div class=\"undertale-box mt-2\">\n        <div class=\"box-header hl-green\">AURAFS VARIABLE EXTENT SOLUTION</div>\n        <p class=\"text-xs\">\n          Instead of allocating two 16KB extents, AuraFS allocates:\n          <strong>Extent 0: 16 KiB</strong> + <strong>Extent 1: 4 KiB</strong> = <strong>20 KiB Total</strong> (Saving 12 KiB of physical flash memory!).\n        </p>\n      </div>\n    "
  },
  {
    "id": 54,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "Act 3: Tier 0 — Inline Z-Node Data",
    "subtitle": "Zero-Block Storage for Small Files (&le; 384 Bytes)",
    "content": "\n  <div class=\"undertale-grid-2\">\n    <div class=\"battle-card green-theme\">\n      <div class=\"card-title hl-green\">★ TIER 0: INLINE STORAGE</div>\n      <div class=\"ascii-block text-xs\">\nZ-Node (512 Bytes):\n┌────────────────────────────┐\n│ Header: flags = INLINE     │\n├────────────────────────────┤\n│ 384-Byte Payload Union     │\n│ \"sensor_calib=42.891...\"   │\n└────────────────────────────┘\n0 Physical Data Blocks Used!\n      </div>\n    </div>\n    <div class=\"battle-card cyan-theme\">\n      <div class=\"card-title hl-cyan\">⚡ 3 MAJOR BENEFITS</div>\n      <ul class=\"pixel-list text-xs\">\n        <li><strong>0 Bytes Slack Waste:</strong> 100% space saved for small IoT configs.</li>\n        <li><strong>1 Disk Read Total:</strong> Reading metadata also fetches payload.</li>\n        <li><strong>Seamless Promotion:</strong> Automatically promoted to extents when size &gt; 384B.</li>\n      </ul>\n    </div>\n  </div>\n    "
  },
  {
    "id": 55,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "Act 3: Extended Attributes (xattrs) & MIME Indexing",
    "subtitle": "Extension-Free Content Classification in the Z-Node",
    "content": "\n  <div class=\"undertale-grid-2\">\n    <div class=\"battle-card green-theme\">\n      <div class=\"card-title hl-green\">★ ZERO-PAYLOAD FAST SNIFFING</div>\n      <div class=\"ascii-block text-xs\">\nZ-Node (512 Bytes):\n├── Header + Extents\n└── xattr_page_id ➔ [0x58415452]\n    ├── \"user.mime_type\" = \"application/json\"\n    └── \"user.sensor_id\" = \"STM32-TEMP-01\"\n      </div>\n      <ul class=\"pixel-list text-xs mt-1\">\n        <li><strong>0ms File Sniffing:</strong> Read MIME type without reading 10MB payload.</li>\n        <li><strong>No File Extension Lock-in:</strong> Freedom from mandatory <code>.txt/.json</code>.</li>\n      </ul>\n    </div>\n    <div class=\"battle-card yellow-theme\">\n      <div class=\"card-title hl-yellow\">🛠️ POSIX-COMPLIANT APIS</div>\n      <div class=\"ascii-block text-xs\">\nufs_setxattr(path, name, val, sz);\nufs_getxattr(path, name, val, sz);\nufs_listxattr(path, list, sz);\nufs_removexattr(path, name);\n      </div>\n    </div>\n  </div>\n    "
  },
  {
    "id": 56,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "Act 3: Transparent Per-Extent Compression (LZ4)",
    "subtitle": "Sub-Block Level Flash Density & Hardware Lifespan",
    "content": "\n  <div class=\"undertale-grid-2\">\n    <div class=\"battle-card green-theme\">\n      <div class=\"card-title hl-green\">★ 3 CORE BENEFITS FOR AURAFS</div>\n      <ul class=\"pixel-list text-xs\">\n        <li><strong>1. 87.5% Space Savings:</strong> Compresses 4 KiB text/telemetry logs down to 512B (1 unit).</li>\n        <li><strong>2. +60% Flash Endurance:</strong> Fewer physical erase/write cycles extend flash lifespan.</li>\n        <li><strong>3. Random Access:</strong> Decompresses individual 4KB extents in 2 microseconds.</li>\n      </ul>\n    </div>\n    <div class=\"battle-card cyan-theme\">\n      <div class=\"card-title hl-cyan\">🗜️ LZ4 EXTENT DECOUPLING</div>\n      <div class=\"ascii-block text-xs\">\nExtent Descriptor:\n├── logical_length = 4,096 B\n├── physical_units = 1 (512 B)\n└── flags = UFS_FLAG_COMPRESSED_LZ4\n\nufs_read() decompresses on-the-fly!\n      </div>\n    </div>\n  </div>\n    "
  },
  {
    "id": 57,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "Act 3: Hardware & Flash Optimizations",
    "subtitle": "64-Bit Bitwise Acceleration & Wear-Leveling Cursors",
    "content": "\n  <div class=\"undertale-grid-2\">\n    <div class=\"battle-card yellow-theme\">\n      <div class=\"card-title hl-yellow\">⚡ 64-BIT WORD BITWISE SCANNER</div>\n      <div class=\"ascii-block text-xs\">\nCast bitmap to uint64_t words:\n- Check 64 units (32 KiB) in 1 instruction!\n- __builtin_ctzll(~word) finds bit in 1 cycle.\n- 64x to 512x faster than byte loops.\n      </div>\n    </div>\n    <div class=\"battle-card green-theme\">\n      <div class=\"card-title hl-green\">🔄 NEXT-FIT ROVING CURSOR</div>\n      <div class=\"ascii-block text-xs\">\ng_zone_cursors[zone_id]:\n- Resumes search from last allocated unit.\n- Sweeps circularly across physical units.\n- Eliminates flash sector wear hotspots!\n- Extends flash chip lifespan by >300%.\n      </div>\n    </div>\n  </div>\n    "
  },
  {
    "id": 58,
    "chapter": "Chapter 4: Allocation & Granularity",
    "zone": "core",
    "zoneName": "Zone 04: The Core",
    "title": "The Master 3-Act Allocation Workflow",
    "subtitle": "End-to-End Decision & Growth Flowchart",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\"><span class=\"pixel-star-large\">★</span> MASTER DECISION PIPELINE</div>\n        <div class=\"ascii-block text-xs\">\n                             INCOMING FILE WRITE\n                                      │\n                    ┌─────────────────┴─────────────────┐\n                    ▼                                   ▼\n          Size &le; 384 Bytes?                     Size &gt; 384 Bytes?\n                    │                                   │\n                    ▼                                   ▼\n        TIER-0 INLINE STORAGE               Existing Slack Available?\n        (Direct inside Z-Node)              ┌───────────┴───────────┐\n                                            ▼                       ▼\n                                       YES: REUSE SLACK       NO: ALLOCATE EXTENT\n                                       (In-place 0 I/O)       (Contiguous-First)\n                                                                    │\n                                                      ┌─────────────┴─────────────┐\n                                                      ▼                           ▼\n                                              CONTIGUOUS RUN?             NEXT-FIT FALLBACK\n                                              (1 Extent Descriptor)       (Multi-Extent Chain)\n        </div>\n      </div>\n    "
  },
  {
    "id": 59,
    "chapter": "Comparison: Allocation & Granularity",
    "zone": "blizzard",
    "zoneName": "Frostfire: FAT32 vs AuraFS",
    "title": "FAT32 vs. AuraFS: Allocation & Granularity",
    "subtitle": "Rigid Coarse Clusters vs. 4-Tier Zero-Overhead Engine",
    "content": "\n    <div class=\"undertale-grid-2\">\n      <div class=\"battle-card cyan-theme\">\n        <div class=\"card-title hl-cyan\">❄️ FAT32 ALLOCATION</div>\n        <div class=\"ascii-block text-xs\">\n100-byte file on 32 KiB cluster:\n┌──────────┬────────────────────────┐\n│ 100 B    │ 32,668 B Wasted (99.7%)│\n└──────────┴────────────────────────┘\n        </div>\n        <ul class=\"pixel-list text-xs mt-1\">\n          <li><strong class=\"hl-red\">Rigid Single Cluster Size:</strong> Drive-wide compromise between slack waste and FAT size.</li>\n          <li><strong class=\"hl-red\">Zero Compression:</strong> Files always occupy raw uncompressed clusters.</li>\n        </ul>\n      </div>\n      <div class=\"battle-card orange-theme\">\n        <div class=\"card-title hl-orange\">🔥 AURAFS ALLOCATION ENGINE</div>\n        <div class=\"ascii-block text-xs\">\n100-byte file in Tier-0 Inline:\n┌───────────────────────────────────┐\n│ 100 B stored in Z-Node (0B Slack) │\n└───────────────────────────────────┘\n        </div>\n        <ul class=\"pixel-list text-xs mt-1\">\n          <li><strong class=\"hl-green\">4 Right-Sized Tiers:</strong> Tier-0 Inline (≤384B), 512B, 4KB, and 16KB units.</li>\n          <li><strong class=\"hl-green\">Transparent LZ4:</strong> In-memory compression reduces physical footprint by up to 87.5%.</li>\n        </ul>\n      </div>\n    </div>\n    "
  },
  {
    "id": 60,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "The Anatomy of a Directory",
    "subtitle": "A Directory is Not a Magical Container",
    "content": "\n      <div class=\"grid-2x2 mb-2\">\n        <div class=\"pill-badge hl-cyan\">DIRECTORY = FILE</div>\n        <div class=\"pill-badge hl-yellow\">64-BYTE SLOTS</div>\n        <div class=\"pill-badge hl-green\">Z-NODE POINTER</div>\n        <div class=\"pill-badge hl-purple\">HOT DIRECTORY CACHE</div>\n      </div>\n      <div class=\"undertale-box\">\n        <div class=\"box-header\">DIRECTORY DATA PAYLOAD</div>\n        <div class=\"ascii-block text-xs\">\nDirectory File Data (Array of 64-Byte dir_disk_t entries):\n[Entry 0: \".\"        ➔ Object ID 0x00000001 (Zone 0, Slot 1)]\n[Entry 1: \"..\"       ➔ Object ID 0x00000001 (Zone 0, Slot 1)]\n[Entry 2: \"notes.txt\"➔ Object ID 0x00000002 (Zone 0, Slot 2)]\n[Entry 3: \"photos\"   ➔ Object ID 0x00010001 (Zone 1, Slot 1)]\n        </div>\n      </div>\n    "
  },
  {
    "id": 61,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "A Directory Is Just a File",
    "subtitle": "Reusing the General File Machinery for Directory Records",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title\">REGULAR FILE (<code>UFS_TYPE_FILE</code>)</div>\n          <div class=\"ascii-block text-xs\">\n[Z-Node] ➔ Extents ➔ [Raw User Data]\n(Text, images, binaries, documents)\n          </div>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title\">DIRECTORY (<code>UFS_TYPE_DIR</code>)</div>\n          <div class=\"ascii-block text-xs\">\n[Z-Node] ➔ Extents ➔ [Array of dir_disk_t]\n(64-byte filename-to-ID records)\n          </div>\n        </div>\n      </div>\n      <div class=\"undertale-box mt-3 text-center\">\n        <span class=\"hl-yellow text-sm\">Directories grow, allocate extents, and reuse slack using the exact same filesystem machinery!</span>\n      </div>\n    "
  },
  {
    "id": 62,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "Deep Dive: Directory Entry Struct (dir_disk_t)",
    "subtitle": "On-Disk 64-Byte Structured Mapping Container for Hierarchical Paths",
    "badge": "STRUCT ANATOMY",
    "quote": "A 64-byte directory record cleanly binds a 48-character filename to a 64-bit Compound Object ID.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-green\"><span class=\"pixel-heart\"></span> ON-DISK STRUCT: <code>dir_disk_t</code> (64 Bytes Packed)</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Field Name</th>\n              <th>Data Type</th>\n              <th>Size</th>\n              <th>Byte Offset</th>\n              <th>Role & Description</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>name[48]</code></td>\n              <td><code>char[48]</code></td>\n              <td><span class=\"pill-badge hl-yellow\">48 B</span></td>\n              <td><code>0x00..0x2F</code></td>\n              <td>Null-terminated filename string (up to 47 characters + null).</td>\n            </tr>\n            <tr>\n              <td><code>active</code></td>\n              <td><code>uint8_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">1 B</span></td>\n              <td><code>0x30</code></td>\n              <td>Slot state: <code>1</code> = Active valid entry, <code>0</code> = Deleted tombstone (reusable).</td>\n            </tr>\n            <tr>\n              <td><code>type</code></td>\n              <td><code>uint8_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">1 B</span></td>\n              <td><code>0x31</code></td>\n              <td>Target object type: <code>1</code> = <code>UFS_TYPE_FILE</code>, <code>2</code> = <code>UFS_TYPE_DIR</code>.</td>\n            </tr>\n            <tr>\n              <td><code>reserved</code></td>\n              <td><code>uint16_t</code></td>\n              <td><span class=\"pill-badge hl-yellow\">2 B</span></td>\n              <td><code>0x32..0x33</code></td>\n              <td>Reserved boundary alignment padding.</td>\n            </tr>\n            <tr>\n              <td><code>object_id</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-green\">8 B</span></td>\n              <td><code>0x34..0x3B</code></td>\n              <td>Compound Object ID (<code>(zone_id &lt;&lt; 32) | local_id</code>).</td>\n            </tr>\n            <tr>\n              <td><code>generation</code></td>\n              <td><code>uint32_t</code></td>\n              <td><span class=\"pill-badge hl-cyan\">4 B</span></td>\n              <td><code>0x3C..0x3F</code></td>\n              <td>Generation counter matching target Z-Node to validate against stale handles.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    "
  },
  {
    "id": 63,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "Why Design It This Way?",
    "subtitle": "Instant Navigation & Painless Renaming",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-cyan\">1. INSTANT NAVIGATION (<code>cd ..</code>)</div>\n          <p class=\"text-xs\">When navigating upward, the shell searches the current directory for <code>\"..\"</code>, reads its <code>object_id</code>, and loads the parent Z-Node in <strong>$O(1)$ time</strong>.</p>\n        </div>\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-green\">2. PAINLESS RENAMING (<code>mv</code>)</div>\n          <p class=\"text-xs\">Renaming a 500 MB file only modifies its 48-byte <code>name</code> string in the directory table. <strong>Zero data blocks are copied or moved!</strong></p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 64,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "Hot Directory Cache",
    "subtitle": "In-Memory Acceleration for Frequent Paths",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header\">HOT CACHE TABLE</div>\n          <div class=\"ascii-block text-xs\">\n\"notes.txt\" ➔ Z-Node (Zone 3, #104)\n\"config\"    ➔ Z-Node (Zone 1, #12)\n\"report\"    ➔ Z-Node (Zone 5, #88)\n          </div>\n        </div>\n        <div class=\"battle-card cyan-theme\">\n          <div class=\"card-title hl-cyan\">⚡ O(1) PATH RESOLUTION</div>\n          <p class=\"text-xs\">\n            128-entry in-memory cache indexed via 64-bit FNV1a hash of <code>(parent_dir_id ^ filename)</code>. Avoids reading directory extents from disk on cache hits.\n          </p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 65,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "Why Not An Overly Complex On-Disk Directory?",
    "subtitle": "Simplicity & Crash Safety over B-Tree Splitting Overhead",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"battle-card red-theme\">\n          <div class=\"card-title\">COMPLEX B-TREE DISK RISKS ❌</div>\n          <ul class=\"pixel-list text-xs\">\n            <li>Frequent node splitting and rebalancing.</li>\n            <li>Multi-block atomic crash update vulnerabilities.</li>\n            <li>High memory and code footprint on microcontrollers.</li>\n          </ul>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title\">AURAFS HYBRID APPROACH ★</div>\n          <ul class=\"pixel-list text-xs\">\n            <li>Simple linear 64-byte records on disk.</li>\n            <li>In-memory Hot Directory Cache for O(1) speed.</li>\n            <li>Tombstone recycling keeps directory extents compact.</li>\n          </ul>\n        </div>\n      </div>\n    "
  },
  {
    "id": 66,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "Crash Consistency",
    "subtitle": "Preventing State Corruption Across Multi-Step Writes",
    "content": "\n      <div class=\"undertale-dialogue\">\n        <div class=\"dialogue-avatar avatar-soul\"></div>\n        <div class=\"dialogue-text\">\n          A single logical file write modifies up to 5 distinct on-disk structures! What happens if power cuts halfway through?\n        </div>\n      </div>\n      <div class=\"grid-3-col mt-3\">\n        <div class=\"battle-card red-theme\">\n          <div class=\"card-title\">WITHOUT JOURNAL</div>\n          <p class=\"text-xs\">Bitmaps say allocated, but Z-Node not written ➔ Leaked disk blocks.</p>\n        </div>\n        <div class=\"battle-card orange-theme\">\n          <div class=\"card-title\">TORN DIRECTORY</div>\n          <p class=\"text-xs\">Directory entry points to uninitialized Z-Node ➔ File system crash.</p>\n        </div>\n        <div class=\"battle-card green-theme\">\n          <div class=\"card-title\">AURAFS WAL</div>\n          <p class=\"text-xs\">Atomic transaction envelopes guarantee clean recovery in &lt; 5 ms.</p>\n        </div>\n      </div>\n    "
  },
  {
    "id": 67,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "Delta-Based Journaling",
    "subtitle": "Recording Logical Transitions, Not Whole Blocks",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-cyan\">EXAMPLE DELTA 1: JOP_SET_ZNODE</div>\n          <div class=\"ascii-block text-xs\">\nJOP_SET_ZNODE {\n  File = 42,\n  Field = size,\n  NewValue = 1024\n}\n          </div>\n        </div>\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-yellow\">EXAMPLE DELTA 2: JOP_SET_BITMAP</div>\n          <div class=\"ascii-block text-xs\">\nJOP_SET_BITMAP {\n  Zone = 2,\n  Unit = 105,\n  Allocated = 1\n}\n          </div>\n        </div>\n      </div>\n      <p class=\"hl-green mt-2 text-center text-xs\">Instead of writing 4 KB whole disk blocks to log, AuraFS writes lightweight atomic delta records.</p>\n    "
  },
  {
    "id": 68,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "Deep Dive: Journal Record Struct (journal_record_disk_t)",
    "subtitle": "4,096-Byte Atomic Transaction Envelope for Crash Resilience",
    "badge": "STRUCT ANATOMY",
    "quote": "Every WAL log entry is sector-aligned to 4,096 bytes and stamped with a monotonic 64-bit Transaction ID.",
    "content": "\n    <div class=\"undertale-box\">\n      <div class=\"box-header hl-red\"><span class=\"pixel-heart\"></span> ON-DISK STRUCT: <code>journal_record_disk_t</code> (4,096 Bytes / 1 Page)</div>\n      <div class=\"matrix-table-wrapper\">\n        <table class=\"pixel-table text-xs\">\n          <thead>\n            <tr>\n              <th>Field Name</th>\n              <th>Data Type</th>\n              <th>Size</th>\n              <th>Byte Offset</th>\n              <th>Role & Operational Function</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>magic</code> / <code>version</code></td>\n              <td><code>uint32_t</code> / <code>uint16_t</code></td>\n              <td><span class=\"pill-badge hl-cyan\">6 B</span></td>\n              <td><code>0x000..0x005</code></td>\n              <td>Journal signature <code>0x4A524E31</code> (<code>\"JRN1\"</code>) & format version.</td>\n            </tr>\n            <tr>\n              <td><code>type</code> (Operation Type)</td>\n              <td><code>uint16_t</code></td>\n              <td><span class=\"pill-badge hl-cyan\">2 B</span></td>\n              <td><code>0x006..0x007</code></td>\n              <td><code>JOP_BEGIN</code>, <code>JOP_SET_ZNODE</code>, <code>JOP_DIR_SLOT</code>, <code>JOP_SET_BITMAP</code>, <code>JOP_COMMIT</code>.</td>\n            </tr>\n            <tr>\n              <td><code>size</code> / <code>reserved0</code></td>\n              <td><code>uint16_t[2]</code></td>\n              <td><span class=\"pill-badge hl-cyan\">4 B</span></td>\n              <td><code>0x008..0x00B</code></td>\n              <td>Payload byte count & boundary alignment.</td>\n            </tr>\n            <tr>\n              <td><code>txid</code> (Transaction ID)</td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-green\">8 B</span></td>\n              <td><code>0x00C..0x013</code></td>\n              <td>Monotonic transaction sequence counter.</td>\n            </tr>\n            <tr>\n              <td><code>object_id</code></td>\n              <td><code>uint64_t</code></td>\n              <td><span class=\"pill-badge hl-green\">8 B</span></td>\n              <td><code>0x014..0x01B</code></td>\n              <td>Target Z-Node or Directory being modified.</td>\n            </tr>\n            <tr>\n              <td><code>zone_id</code> / <code>aux</code></td>\n              <td><code>uint32_t[2]</code></td>\n              <td><span class=\"pill-badge hl-cyan\">8 B</span></td>\n              <td><code>0x01C..0x023</code></td>\n              <td>Target zone index & auxiliary field/slot identifier.</td>\n            </tr>\n            <tr>\n              <td><code>bitmap_unit/value</code></td>\n              <td><code>uint32_t[2]</code></td>\n              <td><span class=\"pill-badge hl-cyan\">8 B</span></td>\n              <td><code>0x024..0x02B</code></td>\n              <td>Bitmap delta: target unit index and allocation bit value (0 or 1).</td>\n            </tr>\n            <tr>\n              <td><code>znode</code> (Full Snapshot)</td>\n              <td><code>znode_disk_t</code></td>\n              <td><span class=\"pill-badge hl-gold\">512 B</span></td>\n              <td><code>0x02C..0x22B</code></td>\n              <td>Complete 512-byte Z-Node state snapshot for deterministic rollback/replay.</td>\n            </tr>\n            <tr>\n              <td><code>dirent</code> (Dir Snapshot)</td>\n              <td><code>dir_disk_t</code></td>\n              <td><span class=\"pill-badge hl-gold\">64 B</span></td>\n              <td><code>0x22C..0x26B</code></td>\n              <td>Directory entry state snapshot.</td>\n            </tr>\n            <tr>\n              <td><code>reserved[]</code></td>\n              <td><code>uint8_t[3476]</code></td>\n              <td><span class=\"pill-badge hl-purple\">3,476 B</span></td>\n              <td><code>0x26C..0xFFF</code></td>\n              <td>Zero padding ensuring atomic 4,096-Byte single-page sector writes.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    "
  },
  {
    "id": 69,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "Why Delta Journaling Fits Our Architecture",
    "subtitle": "Explicit Metadata Operations Match Discrete Data Structures",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\">EXPLICIT METADATA STRUCTURES</div>\n        <p class=\"text-xs\">Because Z-Nodes, Extents, and Bitmaps are structured explicitly, changes are expressed directly as operations:</p>\n        <div class=\"grid-2x2 mt-3\">\n          <div class=\"feature-card cyan-border\">\n            <div class=\"feature-title hl-cyan\">MINIMAL LOG DATA</div>\n            <p class=\"feature-desc\">Only the exact modified delta bytes are written to the 2MB circular journal.</p>\n          </div>\n          <div class=\"feature-card yellow-border\">\n            <div class=\"feature-title hl-yellow\">FAST REPLAY</div>\n            <p class=\"feature-desc\">Replaying journal operations takes less than 5 milliseconds on system boot.</p>\n          </div>\n          <div class=\"feature-card green-border\">\n            <div class=\"feature-title hl-green\">SECTOR ALIGNED</div>\n            <p class=\"feature-desc\">Every journal page is exactly 4,096 bytes, preventing partial torn sector writes.</p>\n          </div>\n          <div class=\"feature-card orange-border\">\n            <div class=\"feature-title hl-orange\">ZERO LEAKAGE</div>\n            <p class=\"feature-desc\">Uncommitted transactions are cleanly discarded without orphaned units.</p>\n          </div>\n        </div>\n      </div>\n    "
  },
  {
    "id": 70,
    "chapter": "Chapter 5: Directory & Consistency",
    "zone": "barrier",
    "zoneName": "Zone 05: The Barrier",
    "title": "One Crash-Safe Allocation Transaction",
    "subtitle": "The Atomic Journaled Sequence",
    "content": "\n      <div class=\"undertale-box\">\n        <div class=\"box-header\">ATOMIC JOURNAL COMMIT PIPELINE</div>\n        <div class=\"pipeline-vertical text-xs\">\n          <div class=\"pipe-row\"><strong>1. ufs_tx_begin():</strong> Start transaction envelope with next monotonic TxID.</div>\n          <div class=\"pipe-row\"><strong>2. Append User Data:</strong> Write file payload bytes to physical extents on disk.</div>\n          <div class=\"pipe-row\"><strong>3. WAL Log Deltas:</strong> Write JOP_SET_BITMAP, JOP_SET_ZNODE, JOP_DIR_SLOT to journal.</div>\n          <div class=\"pipe-row\"><strong>4. Flush Journal:</strong> Issue disk barrier ensuring WAL is persistent on flash.</div>\n          <div class=\"pipe-row\"><strong>5. ufs_tx_commit():</strong> Commit Z-Nodes and Bitmaps to active zone tables.</div>\n        </div>\n      </div>\n    "
  },
  {
    "id": 71,
    "chapter": "Comparison: Directory & Consistency",
    "zone": "blizzard",
    "zoneName": "Frostfire: FAT32 vs AuraFS",
    "title": "FAT32 vs. AuraFS: Directories & Crash Safety",
    "subtitle": "Messy Directory Sweeps vs. Hot Cache & Delta Journaling",
    "content": "\n    <div class=\"undertale-grid-2\">\n      <div class=\"battle-card cyan-theme\">\n        <div class=\"card-title hl-cyan\">❄️ FAT32 DIRECTORIES & RECOVERY</div>\n        <ul class=\"pixel-list text-xs\">\n          <li><strong class=\"hl-red\">32-Byte Linear Slots:</strong> Long filenames require hacky multi-slot VFAT records.</li>\n          <li><strong class=\"hl-red\">No Journaling:</strong> Power failures mid-write cause broken FAT chains, cross-linked files, and orphaned clusters.</li>\n          <li><strong class=\"hl-red\">Painful fsck Sweeps:</strong> Booting after a crash requires full disk scan (chkdsk / fsck.vfat) taking minutes or hours.</li>\n        </ul>\n      </div>\n      <div class=\"battle-card orange-theme\">\n        <div class=\"card-title hl-orange\">🔥 AURAFS DIRECTORIES & CRASH SAFETY</div>\n        <ul class=\"pixel-list text-xs\">\n          <li><strong class=\"hl-green\">Clean 64-Byte Records:</strong> <code>dir_disk_t</code> maps name to Z-Node ID directly.</li>\n          <li><strong class=\"hl-green\">Hot Directory Cache:</strong> In-memory LRU cache accelerates frequent path lookups.</li>\n          <li><strong class=\"hl-green\">Transactional Delta Journal:</strong> Records logical transitions atomically. Replays in &lt;5 ms with zero orphaned blocks.</li>\n        </ul>\n      </div>\n    </div>\n    "
  },
  {
    "id": 72,
    "chapter": "Chapter 6: Summary & Blueprint",
    "zone": "encounter",
    "zoneName": "Zone 08: The Final Encounter",
    "title": "The Full Architecture & 7-Phase FSCK Engine",
    "subtitle": "Master Blueprint & Automated System Consistency Protocol",
    "content": "\n      <div class=\"undertale-grid-2\">\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-gold\"><span class=\"pixel-star-large\">★</span> MASTER ARCHITECTURAL BLUEPRINT</div>\n          <div class=\"ascii-block text-xs\">\n                       APPLICATION / POSIX API\n                                  │\n                       VIRTUAL DISK LAYER\n                                  │\n          ┌───────────────────────┴───────────────────────┐\n          ▼                                               ▼\n   HOT DIRECTORY CACHE                            TRANSACTION JOURNAL\n   (128-Slot FNV1a-64)                            (2MB Circular WAL)\n          │                                               │\n          ▼                                               ▼\n   32 AUTONOMOUS ZONES                          &lt; 5 ms CRASH REPLAY\n   ┌──────────────────────────────────────────────────────────────┐\n   │ Header (4KB) │ Z-Nodes (16KB) │ Bitmap (4KB) │ Data (512B)   │\n   └──────────────────────────────────────────────────────────────┘\n          </div>\n        </div>\n        <div class=\"undertale-box\">\n          <div class=\"box-header hl-cyan\">🛡️ 7-PHASE AUTOMATED FSCK ENGINE</div>\n          <ul class=\"pixel-list text-xs\">\n            <li><strong>Phase 1: Superblock Validation:</strong> Check magic (0x55465332) & FNV1a-32 hash.</li>\n            <li><strong>Phase 2: Journal Integrity:</strong> Validate WAL bounds & monotonic TxIDs.</li>\n            <li><strong>Phase 3: Root Directory:</strong> Verify Root Z-Node at Zone 0 Slot 1.</li>\n            <li><strong>Phase 4: Zone Headers:</strong> Verify all 32 zone headers (0x5A4F4E45).</li>\n            <li><strong>Phase 5: Bitmap Cross-Check:</strong> Detect block leaks & double allocations.</li>\n            <li><strong>Phase 6: Directory Loop & Links:</strong> Check graph loops & link_counts.</li>\n            <li><strong>Phase 7: xattr Chain:</strong> Verify xattr magic (0x58415452) & chains.</li>\n          </ul>\n        </div>\n      </div>\n    "
  },
  {
    "id": 73,
    "chapter": "Chapter 6: Summary & Blueprint",
    "zone": "encounter",
    "zoneName": "Zone 08: The Final Encounter",
    "title": "Master Benchmarks, Algorithmic Complexities & C API",
    "subtitle": "Comparative Evaluation, Time-Space Complexities & Embedding API",
    "content": "\n    <div class=\"matrix-table-wrapper\">\n      <table class=\"pixel-table text-xs\">\n        <thead>\n          <tr>\n            <th>Metric / Subsystem</th>\n            <th>AuraFS v2.0</th>\n            <th>EXT4 (Linux)</th>\n            <th>FAT32 / exFAT</th>\n            <th>F2FS (Flash FS)</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td><strong>Small-File Overhead (&le;384B)</strong></td><td><strong class=\"hl-green\">0 Bytes (Tier-0)</strong></td><td>4,096 B</td><td>512B – 4,096B</td><td>4,096 B</td></tr>\n          <tr><td><strong>Internal Slack Fragmentation</strong></td><td><strong class=\"hl-green\">&lt; 5% (512B Units)</strong></td><td>High on tiny files</td><td>Very High (Coarse)</td><td>Moderate</td></tr>\n          <tr><td><strong>Crash Recovery Time</strong></td><td><strong class=\"hl-green\">&lt; 5 ms (WAL Replay)</strong></td><td>50 ms – 2 sec</td><td>Full disk scan (Minutes)</td><td>10 ms – 100 ms</td></tr>\n          <tr><td><strong>Flash Wear-Leveling</strong></td><td><strong class=\"hl-green\">Native Next-Fit Cursor</strong></td><td>Relies on FTL</td><td>None (Severe FAT wear)</td><td>Log-Structured</td></tr>\n          <tr><td><strong>RAM Runtime Footprint</strong></td><td><strong class=\"hl-green\">&lt; 256 KB (Embedded)</strong></td><td>Multi-Megabyte</td><td>Minimal</td><td>High (Node trees)</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"undertale-box mt-2\">\n      <div class=\"box-header hl-yellow\">C APPLICATION PROGRAMMING INTERFACE (API)</div>\n      <div class=\"ascii-block text-xs\">\n// Lifecycle:  int ufs_format(path, size);  int ufs_mount(path);  int ufs_unmount(void);\n// File I/O:   int ufs_create(path);  int ufs_open(path, flags);  ssize_t ufs_read/write(fd, buf, n);\n// Metadata:   int ufs_stat(path, *st);  int ufs_compress_file(path);  int ufs_debug_fsck(*stat);\n      </div>\n    </div>\n    "
  }
];

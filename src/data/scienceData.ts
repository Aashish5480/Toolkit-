import { GlossaryTerm, ScienceFormula, BiologyConcept, QuestionItem } from "../types";

export const BIOLOGY_MCQ_BANK: QuestionItem[] = [
  {
    id: "bio-1",
    question: "During which phase of meiosis do homologous chromosomes separate while sister chromatids remain associated at their centromeres?",
    type: "MCQ",
    marks: 1,
    options: ["Metaphase I", "Anaphase I", "Anaphase II", "Telophase I"],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "In Anaphase I, homologous chromosome pairs separate to opposite poles while sister chromatids remain joined. In Anaphase II, centromeres split and sister chromatids separate.",
    chapter: "Cell Cycle and Cell Division",
    difficulty: "Medium"
  },
  {
    id: "bio-2",
    question: "The primary enzyme responsible for the removal of RNA primers and gap filling during DNA replication in prokaryotes is:",
    type: "MCQ",
    marks: 1,
    options: ["DNA Polymerase III", "DNA Polymerase I", "DNA Ligase", "RNA Primase"],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "DNA Polymerase I possesses 5' to 3' exonuclease activity that removes RNA primers and replaces them with DNA deoxynucleotides.",
    chapter: "Molecular Basis of Inheritance",
    difficulty: "Hard"
  },
  {
    id: "bio-3",
    question: "In C4 photosynthetic plants, the primary carbon dioxide fixation occurs in the mesophyll cells catalyzed by which enzyme?",
    type: "MCQ",
    marks: 1,
    options: ["RuBisCO", "PEP Carboxylase", "Carbonic Anhydrase", "Pyruvate Dehydrogenase"],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "In C4 plants, PEP Carboxylase fixes CO2 into oxaloacetic acid (4C) in mesophyll cells, avoiding photorespiration.",
    chapter: "Photosynthesis in Higher Plants",
    difficulty: "Medium"
  },
  {
    id: "bio-4",
    question: "Which hormone is synthesized by the corpus luteum to maintain the vascularized endometrial lining for pregnancy?",
    type: "MCQ",
    marks: 1,
    options: ["Estrogen", "Progesterone", "Luteinizing Hormone (LH)", "Follicle Stimulating Hormone (FSH)"],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "Progesterone secreted in large amounts by the corpus luteum maintains the endometrium for blastocyst implantation.",
    chapter: "Human Reproduction",
    difficulty: "Easy"
  },
  {
    id: "bio-5",
    question: "According to the competitive exclusion principle proposed by G.F. Gause, two species competing for the same limiting resource:",
    type: "MCQ",
    marks: 1,
    options: [
      "Can coexist indefinitely if both are carnivores",
      "Cannot coexist indefinitely, and the competitively inferior will be eliminated",
      "Will undergo instantaneous mutualistic evolution",
      "Will switch to asexual reproduction"
    ],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "Gause's Competitive Exclusion Principle states that two species competing for the exact same limiting resource cannot coexist at constant population values; the inferior competitor is eventually eliminated.",
    chapter: "Organisms and Populations",
    difficulty: "Medium"
  },
  {
    id: "bio-6",
    question: "Which of the following is a classic example of an X-linked recessive genetic disorder in humans?",
    type: "MCQ",
    marks: 1,
    options: ["Sickle Cell Anemia", "Haemophilia A", "Phenylketonuria", "Down's Syndrome"],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "Haemophilia is a sex-linked (X-linked) recessive disorder characterized by a defect in clotting factor VIII or IX, showing criss-cross inheritance.",
    chapter: "Principles of Inheritance and Variation",
    difficulty: "Medium"
  }
];


export const BIOLOGY_GLOSSARY: GlossaryTerm[] = [
  {
    term: "Active Transport",
    category: "Cell Biology",
    classLevel: "Class 9-11",
    definition: "The movement of ions or molecules across a cellular membrane against a concentration gradient (from lower to higher concentration), requiring the expenditure of metabolic energy (ATP).",
    keyPoints: [
      "Requires carrier proteins (pumps) and cellular energy (ATP).",
      "Example: Sodium-Potassium pump (Na+/K+ ATPase) in nerve cells.",
      "Crucial for nutrient absorption in intestinal villi and mineral uptake by plant root hairs."
    ],
    relatedTerms: ["Passive Transport", "Facilitated Diffusion", "Osmosis", "ATP"],
    examRelevance: "Frequently asked 2-mark question in CBSE Class 9 & 11; tested in NEET cell physiology."
  },
  {
    term: "Allopolyploidy",
    category: "Genetics & Evolution",
    classLevel: "Class 12 / NEET",
    definition: "A type of polyploidy resulting from the hybridization of two different species followed by chromosome doubling, giving rise to viable fertile polyploid offspring.",
    keyPoints: [
      "Major evolutionary mechanism for speciation in flowering plants.",
      "Example: Hexaploid wheat (Triticum aestivum) has 42 chromosomes (AABBDD genome).",
      "Differs from autopolyploidy (chromosome doubling within the same species)."
    ],
    relatedTerms: ["Polyploidy", "Aneuploidy", "Karyotype", "Speciation"],
    examRelevance: "High-yield NEET Genetics & Plant Breeding concept."
  },
  {
    term: "Apomixis",
    category: "Botany",
    classLevel: "Class 12",
    definition: "A form of asexual reproduction in flowering plants that mimics sexual reproduction, producing seeds without fertilization.",
    keyPoints: [
      "Observed naturally in Asteraceae and grass families.",
      "Used in hybrid seed technology to prevent segregation of desirable hybrid traits across generations.",
      "Can occur via recurrent agamospermy or adventive embryony (e.g., Citrus, Mango nucellar cells)."
    ],
    relatedTerms: ["Parthenocarpy", "Polyembryony", "Agamospermy", "Amphimixis"],
    examRelevance: "NCERT Class 12 Chapter 2 (Sexual Reproduction in Flowering Plants); asked repeatedly in Board & NEET."
  },
  {
    term: "Bowman's Capsule",
    category: "Human Physiology",
    classLevel: "Class 10-11",
    definition: "A double-walled cup-shaped sac at the beginning of the tubular component of a nephron in the mammalian kidney that encapsulates the glomerulus and performs ultrafiltration of blood.",
    keyPoints: [
      "Lined with specialized epithelial cells called podocytes having filtration slits (slit pores).",
      "Glomerular hydrostatic pressure forces water, glucose, urea, and electrolytes into Bowman's space to form primary filtrate.",
      "Proteins and cellular elements do not pass through under healthy conditions."
    ],
    relatedTerms: ["Glomerulus", "Nephron", "Ultrafiltration", "Podocytes", "Malpighian Body"],
    examRelevance: "Class 10 Life Processes and Class 11 Excretory Products and their Elimination."
  },
  {
    term: "Calvin Cycle (C3 Pathway)",
    category: "Botany / Plant Physiology",
    classLevel: "Class 11",
    definition: "The cyclical light-independent biochemical reactions of photosynthesis occurring in the chloroplast stroma that fix carbon dioxide into glucose using ATP and NADPH.",
    keyPoints: [
      "Three core stages: Carboxylation, Reduction, and Regeneration of RuBP.",
      "Primary CO2 acceptor is Ribulose-1,5-bisphosphate (RuBP; 5-carbon keto sugar).",
      "Enzyme responsible: RuBisCO (most abundant protein on Earth).",
      "Fixation of 1 CO2 requires 3 ATP and 2 NADPH; 1 Glucose (6 carbons) requires 18 ATP and 12 NADPH."
    ],
    relatedTerms: ["RuBisCO", "RuBP", "C4 Pathway", "Photophosphorylation", "Stroma"],
    examRelevance: "High-weightage 5-mark question in Class 11 Biology exams & guaranteed NEET question."
  },
  {
    term: "Codominance",
    category: "Genetics",
    classLevel: "Class 12",
    definition: "A genetic pattern of inheritance where both alleles of a gene pair in a heterozygote are fully and equally expressed, resulting in an offspring phenotype showing both parental traits simultaneously.",
    keyPoints: [
      "Classic example: ABO Blood Grouping in humans (Alleles IA and IB are codominant, producing AB blood group).",
      "Differs from Incomplete Dominance (where an intermediate blended phenotype like pink flower color in Snapdragon is formed).",
      "Genotypic and phenotypic ratios match 1:2:1 in F2 generation."
    ],
    relatedTerms: ["Incomplete Dominance", "Multiple Allelism", "Phenotype", "ABO Blood Group"],
    examRelevance: "Essential NCERT Class 12 Principles of Inheritance question."
  },
  {
    term: "Crossing Over",
    category: "Genetics & Cell Biology",
    classLevel: "Class 11-12",
    definition: "The exchange of genetic material between non-sister chromatids of homologous chromosomes during the pachytene stage of Prophase I in meiosis.",
    keyPoints: [
      "Catalyzed by the enzyme recombinase.",
      "Produces new combinations of alleles (genetic recombination), driving evolutionary variation.",
      "Visible at diplotene stage as X-shaped structures known as chiasmata."
    ],
    relatedTerms: ["Meiosis", "Recombination", "Chiasmata", "Pachytene", "Homologous Chromosomes"],
    examRelevance: "Repeatedly tested in Class 11 Meiosis stages and Class 12 Linkage & Recombination."
  },
  {
    term: "Eutrophication",
    category: "Ecology",
    classLevel: "Class 10-12",
    definition: "The natural or cultural aging and nutrient enrichment of a water body (especially with nitrogen and phosphorus compounds), leading to dense growth of algal blooms and subsequent oxygen depletion.",
    keyPoints: [
      "Algal bloom restricts sunlight penetration and consumes dissolved oxygen during decomposition.",
      "Drastically increases Biochemical Oxygen Demand (BOD), causing suffocation and death of aquatic fauna.",
      "Accelerated by agricultural runoff containing synthetic fertilizers and untreated municipal sewage."
    ],
    relatedTerms: ["BOD (Biochemical Oxygen Demand)", "Algal Bloom", "Bioaccumulation", "Biomagnification"],
    examRelevance: "Class 10 Our Environment & Class 12 Environmental Issues."
  },
  {
    term: "Facilitated Diffusion",
    category: "Cell Biology",
    classLevel: "Class 9-11",
    definition: "The passive movement of polar or large hydrophilic molecules across a biological membrane along their concentration gradient with the assistance of transmembrane channel or carrier proteins, without ATP energy expenditure.",
    keyPoints: [
      "Spontaneous passive process driven solely by concentration gradient.",
      "Subject to saturation kinetics (reaches Vmax when all carrier proteins are occupied).",
      "Specific for particular solutes (e.g., GLUT4 glucose transporter)."
    ],
    relatedTerms: ["Passive Transport", "Active Transport", "Carrier Proteins", "Ion Channels"],
    examRelevance: "Class 9 & 11 Cell Transport."
  },
  {
    term: "Homeostasis",
    category: "Human Physiology",
    classLevel: "Class 10-11",
    definition: "The ability of an organism or cellular system to maintain a stable, constant internal physiological environment (e.g., body temperature, blood pH, glucose levels, osmotic pressure) despite external environmental fluctuations.",
    keyPoints: [
      "Regulated primarily through negative feedback loops.",
      "Hypothalamus acts as the body's master thermoregulatory center.",
      "Conformers vs Regulators: Mammals and birds are active regulators (homeotherms)."
    ],
    relatedTerms: ["Negative Feedback", "Thermoregulation", "Hypothalamus", "Osmoregulation"],
    examRelevance: "Foundational concept in Animal Physiology and Ecology."
  },
  {
    term: "Mitochondria",
    category: "Cell Biology",
    classLevel: "Class 9-11",
    definition: "Double-membrane-bound semi-autonomous cellular organelles responsible for aerobic cellular respiration and ATP generation via oxidative phosphorylation.",
    keyPoints: [
      "Outer membrane is smooth; inner membrane forms extensive invaginations called cristae to maximize surface area for ETS (Electron Transport System).",
      "Contains its own circular dsDNA, 70S ribosomes, and RNA, supporting the endosymbiotic theory.",
      "Known as the 'Powerhouse of the Cell'."
    ],
    relatedTerms: ["ATP", "Cristae", "Oxidative Phosphorylation", "Krebs Cycle", "Endosymbiosis"],
    examRelevance: "Class 9 Cell Structure and Class 11 Cell The Unit of Life."
  },
  {
    term: "Nephron",
    category: "Human Physiology",
    classLevel: "Class 10-11",
    definition: "The fundamental structural and functional microscopic filtration unit of the mammalian kidney, responsible for filtering blood, selective reabsorption, secretion, and urine formation.",
    keyPoints: [
      "Each human kidney contains approximately 1 million nephrons.",
      "Consists of Malpighian corpuscle (Glomerulus + Bowman's capsule) and Renal Tubule (PCT, Loop of Henle, DCT, Collecting Duct).",
      "Juxtamedullary nephrons with long Henle's loops create hypertonic medullary concentration gradients via counter-current mechanism."
    ],
    relatedTerms: ["Bowman's Capsule", "Glomerulus", "Loop of Henle", "PCT", "DCT", "Counter-Current Mechanism"],
    examRelevance: "Class 10 & 11 Life Processes and Excretory System."
  },
  {
    term: "Parthenogenesis",
    category: "Zoology & Botany",
    classLevel: "Class 12",
    definition: "A form of reproduction in which an unfertilized female egg cell develops directly into an embryo/new individual without fertilization by male sperm.",
    keyPoints: [
      "Found in rotifers, honeybees (unfertilized haploid eggs develop into male drones), turkeys, and some lizards.",
      "Differs from Parthenocarpy (formation of seedless fruits without fertilization, e.g., banana)."
    ],
    relatedTerms: ["Parthenocarpy", "Apomixis", "Haplodiploidy", "Syngamy"],
    examRelevance: "NCERT Class 12 Chapter 1 & 2 high-frequency distinction question."
  },
  {
    term: "Plasmid",
    category: "Biotechnology & Genetics",
    classLevel: "Class 12",
    definition: "A small, circular, double-stranded extra-chromosomal DNA molecule capable of autonomous replication, commonly found in bacteria and used as a cloning vector in genetic engineering.",
    keyPoints: [
      "Key features of a cloning plasmid: Origin of replication (ori), selectable markers (ampR, tetR), and unique restriction recognition sites (MCS).",
      "Standard vector: pBR322 constructed by Bolivar and Rodriguez (1977).",
      "Ti-plasmid of Agrobacterium tumefaciens is used as a natural genetic engineer in plants."
    ],
    relatedTerms: ["Cloning Vector", "Restriction Enzyme", "Recombinant DNA", "pBR322", "Selectable Marker"],
    examRelevance: "Biotechnology: Principles and Processes (Class 12 NCERT major topic)."
  },
  {
    term: "Sinoatrial Node (SAN)",
    category: "Human Physiology",
    classLevel: "Class 11",
    definition: "A specialized cluster of auto-excitable nodal cardiac muscle fibers situated in the upper right corner of the right atrium that generates rhythmic electrical action potentials to initiate heart contractions.",
    keyPoints: [
      "Known as the primary natural 'Pacemaker of the Heart'.",
      "Generates maximum number of action potentials (70-75 impulses per minute) to maintain normal cardiac rhythm.",
      "Regulated by the autonomic nervous system (sympathetic accelerates, parasympathetic slows down)."
    ],
    relatedTerms: ["Pacemaker", "AV Node", "Bundle of His", "Purkinje Fibers", "Cardiac Cycle"],
    examRelevance: "Class 11 Body Fluids and Circulation core exam topic."
  },
  {
    term: "Translation",
    category: "Genetics & Molecular Biology",
    classLevel: "Class 12",
    definition: "The cellular process in the ribosome wherein the sequence of nucleotide codons in a messenger RNA (mRNA) transcript is translated into a specific amino acid sequence to synthesize a polypeptide protein chain.",
    keyPoints: [
      "Three distinct stages: Initiation (AUG start codon coding for Methionine), Elongation (Peptidyl transferase ribozyme 23S rRNA in prokaryotes), and Termination (UAA, UAG, UGA stop codons).",
      "Requires tRNA molecules (adaptor molecules) carrying specific amino acids charged via Aminoacyl-tRNA synthetase."
    ],
    relatedTerms: ["Transcription", "Codon", "tRNA", "Ribosome", "Peptidyl Transferase"],
    examRelevance: "Class 12 Molecular Basis of Inheritance high-mark question."
  }
];

export const BIOLOGY_CONCEPTS: BiologyConcept[] = [
  {
    id: "photosynthesis-mechanisms",
    name: "Mechanism of Photosynthesis (Light & Dark Reactions)",
    classLevel: "Class 10 & 11",
    chapter: "Plant Physiology / Life Processes",
    summary: "Photosynthesis is the physico-chemical anabolic process by which green plants use light energy to synthesize organic compounds from water and carbon dioxide, releasing oxygen as a byproduct.",
    mechanism: [
      "Phase 1: Light-Dependent Reactions (Thylakoids) - Absorption of solar photons by Chlorophyll pigment complexes (PS II at 680nm and PS I at 700nm).",
      "Photolysis of Water: 2H2O → 4H+ + 4e- + O2 (catalyzed by Oxygen Evolving Complex with Mn2+ and Cl-).",
      "Photophosphorylation: Non-cyclic electron transport creates a proton gradient across thylakoid membrane, synthesizing ATP (via ATP Synthase CF0-CF1) and reducing NADP+ to NADPH.",
      "Phase 2: Dark / Light-Independent Reactions (Stroma) - Calvin Cycle fixes atmospheric CO2 into 3-PGA via RuBisCO.",
      "Reduction & Sugar Synthesis: 3-PGA reduced using ATP & NADPH to G3P/Glucose.",
      "Regeneration: RuBP regenerated to sustain the cycle (1 ATP per RuBP regenerated)."
    ],
    keyTerms: ["Thylakoid", "Stroma", "RuBisCO", "Photolysis of Water", "Z-Scheme", "NADPH", "Chemiosmotic Hypothesis"],
    neetTips: "Memorize the stoichiometry: Synthesis of 1 glucose molecule requires 6 turns of Calvin cycle, consuming exactly 18 ATP and 12 NADPH.",
    relatedConcepts: ["calvin-cycle", "cellular-respiration", "chloroplast-structure"]
  },
  {
    id: "dna-replication",
    name: "Semiconservative DNA Replication Mechanism",
    classLevel: "Class 12 / NEET",
    chapter: "Molecular Basis of Inheritance",
    summary: "DNA replication is the biological process of producing two identical replicas of DNA from one original DNA molecule, proven semiconservative by Meselson and Stahl using 15N heavy isotope.",
    mechanism: [
      "Initiation at Origin of Replication (Ori) - DNA Helicase unwinds the double helix, creating a Y-shaped replication fork.",
      "Single-Strand Binding Proteins (SSB) prevent rewinding, and DNA Topoisomerase (Gyrase) relieves supercoiling tension.",
      "RNA Primer Synthesis - RNA Primase synthesizes short RNA primers required to provide a free 3'-OH end.",
      "Chain Elongation - DNA Polymerase III adds complementary deoxynucleotides strictly in 5' → 3' direction.",
      "Leading vs Lagging Strand: Leading strand is synthesized continuously towards the fork; Lagging strand is synthesized discontinuously away from fork as Okazaki fragments.",
      "Primer Removal & Ligation: DNA Polymerase I removes RNA primers via 5'→3' exonuclease activity and fills gaps; DNA Ligase seals phosphodiester nicks."
    ],
    keyTerms: ["Helicase", "DNA Polymerase", "Okazaki Fragments", "DNA Ligase", "Topoisomerase", "Meselson-Stahl Experiment"],
    neetTips: "DNA Polymerase cannot initiate synthesis de novo; it strictly requires a primer with a free 3'-OH group and synthesizes exclusively in 5' to 3' direction.",
    relatedConcepts: ["transcription-mechanism", "translation-mechanism", "dna-structure"]
  },
  {
    id: "cardiac-cycle",
    name: "The Human Cardiac Cycle & Electrical Conduction",
    classLevel: "Class 11",
    chapter: "Body Fluids and Circulation",
    summary: "The cardiac cycle comprises all physiological and mechanical events occurring from the beginning of one heartbeat to the beginning of the next, lasting approximately 0.8 seconds at 72 bpm.",
    mechanism: [
      "1. Joint Diastole (0.4 s): All 4 chambers (atria and ventricles) are relaxed. Bicuspid (mitral) and tricuspid valves open; blood flows passively from vena cava and pulmonary veins into ventricles (~70% ventricular filling).",
      "2. Atrial Systole (0.1 s): Sinoatrial Node (SAN) generates an action potential that spreads across atria. Both atria contract, pumping remaining 30% blood volume into ventricles.",
      "3. Ventricular Systole (0.3 s): Impulse travels through AV Node → Bundle of His → Purkinje fibers. Ventricles contract, intraventricular pressure rises sharply.",
      "Heart Sound 1 ('LUB'): Rapid closure of atrioventricular (bicuspid/tricuspid) valves produces the first low-pitched heart sound 'LUB'.",
      "Ejection Phase: Semilunar valves open, ejecting stroke volume (~70 mL) into aorta and pulmonary artery.",
      "Heart Sound 2 ('DUB'): As ventricles relax in ventricular diastole, backflow of blood snaps semilunar valves shut, producing the high-pitched second heart sound 'DUB'."
    ],
    keyTerms: ["SAN Pacemaker", "Stroke Volume (70 mL)", "Cardiac Output (5 L/min)", "LUB-DUB Sounds", "ECG Waves (P, QRS, T)"],
    neetTips: "Cardiac Output = Stroke Volume (70 mL) × Heart Rate (72 bpm) ≈ 5040 mL/min ≈ 5 Litres/min.",
    relatedConcepts: ["blood-pressure-regulation", "nephron-filtration", "respiratory-gas-transport"]
  },
  {
    id: "mendelian-genetics",
    name: "Mendel's Laws of Inheritance & Dihybrid Cross",
    classLevel: "Class 10 & 12",
    chapter: "Principles of Inheritance and Variation",
    summary: "Gregor Johann Mendel established the fundamental laws of heredity using seven pairs of contrasting traits in the garden pea plant (Pisum sativum).",
    mechanism: [
      "1. Law of Dominance: In a monohybrid cross between two pure-breeding contrasting parents, only the dominant allele expresses in F1; recessive allele remains latent.",
      "2. Law of Segregation (Purity of Gametes): Alleles of a gene separate during gamete formation (meiosis) so each gamete receives only one allele (Universal law with no exceptions).",
      "Monohybrid F2 Ratio: Phenotypic = 3:1 (Tall:Dwarf); Genotypic = 1:2:1 (TT:Tt:tt).",
      "3. Law of Independent Assortment: When two pairs of traits are combined in a dihybrid cross, segregation of one pair is independent of the other pair.",
      "Dihybrid Cross (Round Yellow × Wrinkled Green): F2 Phenotypic ratio is 9:3:3:1 (9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green)."
    ],
    keyTerms: ["Monohybrid Cross", "Dihybrid Cross", "Allele", "Homozygous", "Heterozygous", "Punnett Square", "Test Cross"],
    neetTips: "Test cross (F1 hybrid × homozygous recessive parent, e.g. Tt × tt) gives a 1:1 ratio for monohybrid and 1:1:1:1 for dihybrid, used to determine unknown genotype.",
    relatedConcepts: ["codominance", "linkage-and-crossing-over", "sex-determination"]
  }
];

export const CHEMISTRY_FORMULAS: ScienceFormula[] = [
  {
    name: "Nernst Equation",
    branch: "Chemistry",
    category: "Physical Chemistry / Electrochemistry",
    formula: "E_cell = E°_cell - (2.303 RT / nF) log10(Q)  =>  E_cell = E°_cell - (0.0591 / n) log10(Q) at 298 K",
    variables: [
      { symbol: "E_cell", meaning: "Cell potential under non-standard conditions", unit: "Volts (V)" },
      { symbol: "E°_cell", meaning: "Standard cell reduction potential (E°_cathode - E°_anode)", unit: "Volts (V)" },
      { symbol: "n", meaning: "Number of moles of electrons transferred in balanced cell reaction", unit: "dimensionless" },
      { symbol: "Q", meaning: "Reaction quotient = [Products]^coefficients / [Reactants]^coefficients", unit: "dimensionless" },
      { symbol: "F", meaning: "Faraday constant (96,500 C/mol)", unit: "C/mol" }
    ],
    explanation: "Relates the reduction potential of an electrochemical cell or half-cell to standard electrode potential, temperature, and activities/concentrations of ionic species involved.",
    relatedFormulas: ["Gibbs Free Energy (ΔG° = -nFE°_cell)", "Equilibrium Constant (log K_c = nE°_cell / 0.0591)"],
    exampleProblem: {
      problem: "Calculate the EMF of the cell: Zn(s) | Zn2+(0.01 M) || Cu2+(0.1 M) | Cu(s) at 298 K. Given: E°(Zn2+/Zn) = -0.76 V, E°(Cu2+/Cu) = +0.34 V.",
      given: "E°_cell = 0.34 - (-0.76) = 1.10 V; n = 2; Q = [Zn2+]/[Cu2+] = 0.01 / 0.1 = 0.1",
      solution: "E_cell = 1.10 - (0.0591 / 2) × log10(0.1) = 1.10 - (0.02955 × (-1)) = 1.10 + 0.02955",
      answer: "E_cell = 1.13 V"
    }
  },
  {
    name: "Raoult's Law (Relative Lowering of Vapor Pressure)",
    branch: "Chemistry",
    category: "Physical Chemistry / Solutions",
    formula: "(P°_A - P_A) / P°_A = x_B = (n_B) / (n_A + n_B)",
    variables: [
      { symbol: "P°_A", meaning: "Vapor pressure of pure solvent A", unit: "atm / bar / mmHg" },
      { symbol: "P_A", meaning: "Vapor pressure of solution containing non-volatile solute B", unit: "atm / bar / mmHg" },
      { symbol: "x_B", meaning: "Mole fraction of non-volatile solute", unit: "dimensionless" },
      { symbol: "n_B", meaning: "Moles of solute (w_B / M_B)", unit: "mol" },
      { symbol: "n_A", meaning: "Moles of solvent (w_A / M_A)", unit: "mol" }
    ],
    explanation: "States that the relative lowering of vapor pressure of a dilute solution containing a non-volatile solute is equal to the mole fraction of the solute in the solution.",
    relatedFormulas: ["Elevation in Boiling Point (ΔTb = i × Kb × m)", "Depression in Freezing Point (ΔTf = i × Kf × m)", "Osmotic Pressure (π = iCRT)"],
    exampleProblem: {
      problem: "The vapor pressure of pure water at 293 K is 17.5 mm Hg. Calculate the vapor pressure of water when 25 g of glucose (M = 180 g/mol) is dissolved in 450 g of water (M = 18 g/mol).",
      given: "P°_A = 17.5 mmHg, n_B = 25/180 = 0.139 mol, n_A = 450/18 = 25.0 mol",
      solution: "x_B = 0.139 / (25 + 0.139) = 0.00553. Lowering ΔP = P°_A × x_B = 17.5 × 0.00553 = 0.0968 mmHg. P_A = 17.5 - 0.0968",
      answer: "P_solution = 17.40 mmHg"
    }
  },
  {
    name: "First Order Chemical Kinetics Rate Law",
    branch: "Chemistry",
    category: "Physical Chemistry / Chemical Kinetics",
    formula: "k = (2.303 / t) log10([A]0 / [A]t)   and   t_1/2 = 0.693 / k",
    variables: [
      { symbol: "k", meaning: "Rate constant for first-order reaction", unit: "s^-1 or min^-1" },
      { symbol: "t", meaning: "Reaction elapsed time", unit: "seconds (s) or minutes" },
      { symbol: "[A]0", meaning: "Initial concentration of reactant at t = 0", unit: "mol/L (M)" },
      { symbol: "[A]t", meaning: "Concentration of reactant remaining at time t", unit: "mol/L (M)" },
      { symbol: "t_1/2", meaning: "Half-life of first-order reaction (independent of [A]0)", unit: "s or min" }
    ],
    explanation: "For a first order reaction, rate of reaction is directly proportional to the first power of concentration. Half-life is completely independent of initial concentration.",
    relatedFormulas: ["Arrhenius Equation (k = A e^(-Ea / RT))", "Zero Order Rate Law ([A]t = [A]0 - kt)"]
  },
  {
    name: "Ideal Gas Equation & Dalton's Law",
    branch: "Chemistry",
    category: "Physical Chemistry / States of Matter",
    formula: "P V = n R T = (w / M) R T   and   P_total = Σ P_i = Σ (x_i × P_total)",
    variables: [
      { symbol: "P", meaning: "Absolute pressure of gas", unit: "atm or Pa (N/m²)" },
      { symbol: "V", meaning: "Volume of gas container", unit: "Liters (L) or m³" },
      { symbol: "n", meaning: "Amount of gas in moles", unit: "mol" },
      { symbol: "R", meaning: "Universal gas constant (0.0821 L·atm/mol·K or 8.314 J/mol·K)", unit: "J/(mol·K)" },
      { symbol: "T", meaning: "Absolute thermodynamic temperature", unit: "Kelvin (K)" }
    ],
    explanation: "Combines Boyle's, Charles's, and Avogadro's laws into a unified equation of state for ideal gases.",
    relatedFormulas: ["Van der Waals Equation ((P + an²/V²)(V - nb) = nRT)", "Graham's Law of Diffusion (r1/r2 = √(M2/M1))"]
  },
  {
    name: "Molarity, Molality & Normality",
    branch: "Chemistry",
    category: "Physical Chemistry / Basic Concepts",
    formula: "Molarity (M) = n_solute / V_solution(L)   |   Molality (m) = n_solute / W_solvent(kg)   |   Normality (N) = M × n-factor",
    variables: [
      { symbol: "M", meaning: "Molarity (temperature dependent due to volume)", unit: "mol/L (M)" },
      { symbol: "m", meaning: "Molality (temperature independent, mass based)", unit: "mol/kg (m)" },
      { symbol: "n-factor", meaning: "Acidity of base, basicity of acid, or electrons transferred in redox", unit: "dimensionless" }
    ],
    explanation: "Standard quantitative expressions for solute concentration in liquid chemical solutions.",
    relatedFormulas: ["Mole Fraction (x_A = n_A / Σn)", "Parts Per Million (ppm = (mass solute / mass solution) × 10^6)"]
  }
];

export const PHYSICS_FORMULAS: ScienceFormula[] = [
  {
    name: "Coulomb's Law (Electrostatics)",
    branch: "Physics",
    category: "Electrostatics",
    formula: "F = (1 / 4πε₀) × (|q₁ q₂| / r²)   where 1/(4πε₀) = 9 × 10⁹ N·m²/C²",
    variables: [
      { symbol: "F", meaning: "Electrostatic force between two stationary point charges", unit: "Newtons (N)" },
      { symbol: "q₁, q₂", meaning: "Magnitudes of the electric charges", unit: "Coulombs (C)" },
      { symbol: "r", meaning: "Distance of separation between charges", unit: "meters (m)" },
      { symbol: "ε₀", meaning: "Permittivity of free space (8.854 × 10⁻¹² C²/N·m²)", unit: "C²/(N·m²)" }
    ],
    explanation: "States that the magnitude of the electrostatic force between two point charges is directly proportional to the product of charges and inversely proportional to the square of the distance between them.",
    relatedFormulas: ["Electric Field (E = F / q = kq/r²)", "Electrostatic Potential (V = kq/r)", "Electrostatic Potential Energy (U = kq₁q₂/r)"],
    exampleProblem: {
      problem: "Calculate the electrostatic force between two alpha particles (charge q = +2e = 3.2 × 10⁻¹⁹ C) separated by a distance of 3.2 × 10⁻¹⁵ m in vacuum.",
      given: "q₁ = q₂ = 3.2 × 10⁻¹⁹ C; r = 3.2 × 10⁻¹⁵ m; k = 9 × 10⁹ N·m²/C²",
      solution: "F = (9 × 10⁹ × 3.2 × 10⁻¹⁹ × 3.2 × 10⁻¹⁹) / (3.2 × 10⁻¹⁵)² = (9 × 10⁹ × 10.24 × 10⁻³⁸) / (10.24 × 10⁻³⁰) = 9 × 10¹ N",
      answer: "F = 90 N (Repulsive)"
    }
  },
  {
    name: "Lens Maker's Formula & Thin Lens Equation",
    branch: "Physics",
    category: "Optics / Ray Optics",
    formula: "1/f = (μ - 1) [ (1/R₁) - (1/R₂) ]   and   (1/v) - (1/u) = 1/f",
    variables: [
      { symbol: "f", meaning: "Focal length of lens (positive for convex, negative for concave)", unit: "meters (m)" },
      { symbol: "μ", meaning: "Refractive index of lens material relative to medium (μ_lens / μ_med)", unit: "dimensionless" },
      { symbol: "R₁, R₂", meaning: "Radii of curvature of first and second refractive surfaces", unit: "meters (m)" },
      { symbol: "v", meaning: "Image distance from optical center", unit: "meters (m)" },
      { symbol: "u", meaning: "Object distance from optical center (always negative by Cartesian convention)", unit: "meters (m)" }
    ],
    explanation: "Relates the focal length of a thin lens to the refractive index of its material and radii of curvature of its two spherical surfaces.",
    relatedFormulas: ["Power of Lens (P = 1/f in dioptres)", "Linear Magnification (m = v/u = h_i / h_o)", "Combination of Lenses (1/F = 1/f₁ + 1/f₂)"]
  },
  {
    name: "Ohm's Law, Resistance & Drift Velocity",
    branch: "Physics",
    category: "Current Electricity",
    formula: "V = I R   |   R = ρ (L / A)   |   I = n e A v_d   |   v_d = (e E τ) / m",
    variables: [
      { symbol: "V", meaning: "Potential difference across conductor", unit: "Volts (V)" },
      { symbol: "I", meaning: "Electric current", unit: "Amperes (A)" },
      { symbol: "R", meaning: "Electrical resistance", unit: "Ohms (Ω)" },
      { symbol: "ρ", meaning: "Electrical resistivity of material", unit: "Ohm·meter (Ω·m)" },
      { symbol: "v_d", meaning: "Average drift velocity of electrons", unit: "m/s" },
      { symbol: "n", meaning: "Free electron number density", unit: "electrons/m³" },
      { symbol: "τ", meaning: "Mean relaxation time between collisions", unit: "seconds (s)" }
    ],
    explanation: "Fundamental equations governing steady state charge transport in metallic conductors.",
    relatedFormulas: ["Joule's Heating Law (H = I² R t)", "Kirchhoff's Current & Voltage Laws (KCL & KVL)", "Wheatstone Bridge (P/Q = R/S)"]
  },
  {
    name: "Einstein's Photoelectric Equation",
    branch: "Physics",
    category: "Modern Physics / Dual Nature of Radiation",
    formula: "K_max = h ν - Φ₀ = h (ν - ν₀) = e V₀",
    variables: [
      { symbol: "K_max", meaning: "Maximum kinetic energy of emitted photoelectrons", unit: "Joules (J) or eV" },
      { symbol: "h", meaning: "Planck's constant (6.626 × 10⁻³⁴ J·s)", unit: "J·s" },
      { symbol: "ν", meaning: "Frequency of incident photon radiation (c/λ)", unit: "Hertz (Hz)" },
      { symbol: "Φ₀", meaning: "Work function of the photosensitive metal surface (h ν₀)", unit: "Joules (J) or eV" },
      { symbol: "ν₀", meaning: "Threshold frequency required for emission", unit: "Hertz (Hz)" },
      { symbol: "V₀", meaning: "Stopping / Cut-off potential", unit: "Volts (V)" }
    ],
    explanation: "States that when photon of energy hν strikes a photosensitive metal, part of the energy is used to overcome the work function Φ₀ and the remaining energy is converted into maximum kinetic energy of the ejected electron.",
    relatedFormulas: ["de Broglie Wavelength (λ = h / p = h / √(2mE))", "Bohr's Energy Levels (E_n = -13.6 / n² eV)"]
  },
  {
    name: "Newton's Laws of Motion & Kinematics",
    branch: "Physics",
    category: "Mechanics",
    formula: "v = u + at   |   s = ut + ½ at²   |   v² = u² + 2as   |   F_net = m a = dp/dt",
    variables: [
      { symbol: "u", meaning: "Initial velocity", unit: "m/s" },
      { symbol: "v", meaning: "Final velocity at time t", unit: "m/s" },
      { symbol: "a", meaning: "Uniform linear acceleration", unit: "m/s²" },
      { symbol: "s", meaning: "Linear displacement", unit: "meters (m)" },
      { symbol: "F_net", meaning: "Net external applied force", unit: "Newtons (N)" },
      { symbol: "p", meaning: "Linear momentum (m × v)", unit: "kg·m/s" }
    ],
    explanation: "The foundational classical mechanics laws governing linear translational motion under constant acceleration.",
    relatedFormulas: ["Work Done (W = F · s = F s cos θ)", "Kinetic Energy (K = ½ m v²)", "Work-Energy Theorem (W_net = ΔK)"]
  }
];

const hospitalData = {
    // Departments
    'cardiology-center': {
        title: 'Cardiology Center',
        category: 'SPECIALTY CARE',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
        overview: 'State-of-the-art cardiac care unit with advanced catheterization labs, cardiac ICU, and a dedicated heart failure management program.',
        scope: [
            'Interventional cardiology',
            'Cardiac ICU monitoring',
            'Advanced catheterization labs',
            'Heart failure management program',
            'Cardiac rehabilitation'
        ]
    },
    'neurology-institute': {
        title: 'Neurology Institute',
        category: 'SPECIALTY CARE',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80',
        overview: 'Advanced neurological care for brain, spine, and nervous system disorders with cutting-edge diagnostic and treatment options.',
        scope: [
            'Stroke management',
            'Spine surgery & care',
            'Epilepsy treatment',
            'Neuro-rehabilitation'
        ]
    },
    'orthopedic-care': {
        title: 'Orthopedic Care Unit',
        category: 'SURGERY',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80',
        overview: 'Expert orthopedic care covering joint replacements, trauma, sports injuries, and complex spine surgeries.',
        scope: [
            'Total joint replacements',
            'Sports medicine & injuries',
            'Trauma surgery',
            'Minimally invasive spine surgery'
        ]
    },
    'emergency-trauma': {
        title: 'Emergency Trauma Center',
        category: 'EMERGENCY',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80',
        overview: '24/7 dedicated trauma care with specialized emergency physicians, immediate triage, and advanced life support systems.',
        scope: [
            '24/7 Emergency response',
            'Advanced trauma life support',
            'Critical care triage',
            'Immediate surgical intervention'
        ]
    },
    'advanced-diagnostics': {
        title: 'Advanced Diagnostic Lab',
        category: 'DIAGNOSTICS',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80',
        overview: 'Comprehensive pathology and laboratory services equipped with state-of-the-art automated testing and rapid accurate reporting.',
        scope: [
            'Automated pathology',
            'Molecular diagnostics',
            'Microbiology lab',
            'Rapid turnaround reporting'
        ]
    },
    'cancer-care': {
        title: 'Cancer Care Center',
        category: 'SPECIALTY CARE',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80',
        overview: 'A holistic approach to oncology offering chemotherapy, radiation therapy, and surgical oncology with personalized care plans.',
        scope: [
            'Surgical oncology',
            'Chemotherapy & Medical oncology',
            'Radiation therapy',
            'Palliative care'
        ]
    },
    'womens-health': {
        title: "Women's Health Department",
        category: 'SPECIALTY CARE',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
        overview: 'Dedicated maternity and gynecological care, high-risk pregnancy management, and comprehensive health screenings for women.',
        scope: [
            'Obstetrics & Maternity care',
            'High-risk pregnancy management',
            'Minimally invasive gynecology',
            'Women\'s wellness screenings'
        ]
    },
    'pediatric-care': {
        title: 'Pediatric Care Center',
        category: 'SPECIALTY CARE',
        image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80',
        overview: 'Child-friendly pediatric wards with specialized neonatal intensive care (NICU) and expert pediatricians available 24/7.',
        scope: [
            'Neonatal Intensive Care (NICU)',
            'Pediatric surgery',
            'Child vaccinations & wellness',
            '24/7 Pediatric emergency'
        ]
    },
    'surgical-excellence': {
        title: 'Surgical Excellence Unit',
        category: 'SURGERY',
        image: 'https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80',
        overview: 'Advanced modular operation theaters equipped for minimally invasive, laparoscopic, and general surgeries with high safety standards.',
        scope: [
            'Laparoscopic surgery',
            'General surgery',
            'Modular OT systems',
            'Post-operative critical care'
        ]
    },
    'radiology-imaging-center': {
        title: 'Radiology & Imaging Center',
        category: 'DIAGNOSTICS',
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80',
        overview: 'Advanced imaging center with 3T MRI, 128-slice CT, PET-CT, digital X-ray, and interventional radiology services.',
        scope: [
            '3T MRI scanner',
            '128-slice CT scan',
            'PET-CT imaging',
            'Interventional radiology'
        ]
    },

    // Services (Mapping some common ones directly)
    'cardiology': {
        title: 'Cardiology Services',
        category: 'SERVICES',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
        overview: 'Comprehensive cardiac care from diagnosis to intervention, managed by experienced cardiologists and cardiac surgeons.',
        scope: [
            'Interventional cardiology and catheterization lab',
            'Cardiac ICU with round-the-clock monitoring',
            'Non-invasive diagnostics: ECG, Echo, Stress Test',
            'Heart failure management and rehabilitation'
        ]
    },
    'neurology': {
        title: 'Neurology Services',
        category: 'SERVICES',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80',
        overview: 'Advanced neurological care for brain, spine, and nervous system disorders with cutting-edge diagnostic and treatment options.',
        scope: [
            'Stroke management and cerebrovascular care',
            'Epilepsy monitoring and seizure management',
            'Neuro-rehabilitation and physiotherapy',
            'Advanced neuro-imaging'
        ]
    },
    'orthopedics': {
        title: 'Orthopedic Services',
        category: 'SERVICES',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80',
        overview: 'Expert orthopedic care covering joint replacements, trauma, sports injuries, and complex spine surgeries.',
        scope: [
            'Total hip, knee, and shoulder replacements',
            'Arthroscopic surgery and sports medicine',
            'Complex trauma and fracture management',
            'Spine surgery and rehabilitation'
        ]
    },
    'emergency-care': {
        title: 'Emergency Care',
        category: 'SERVICES',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80',
        overview: '24/7 emergency response with a dedicated trauma team, advanced life support ambulances, and immediate triage protocols.',
        scope: [
            '24/7 Emergency physicians on duty',
            'Advanced Life Support (ALS) ambulances',
            'Dedicated trauma resuscitation bays',
            'Rapid diagnostic turnaround times'
        ]
    },
    'diagnostics': {
        title: 'Diagnostics Services',
        category: 'SERVICES',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80',
        overview: 'State-of-the-art pathology and radiology services providing accurate, timely, and comprehensive diagnostic reporting.',
        scope: [
            'Fully automated pathology laboratory',
            'Advanced Radiology: MRI, CT, X-Ray, Ultrasound',
            'Health screening packages',
            'Molecular and genetic testing'
        ]
    },
    'surgery': {
        title: 'Surgery Services',
        category: 'SERVICES',
        image: 'https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80',
        overview: 'World-class surgical care utilizing minimally invasive techniques, modular operation theaters, and strict infection control.',
        scope: [
            'General and laparoscopic surgery',
            'Onco-surgery and neurosurgery',
            'Post-operative intensive care',
            'Day care surgical procedures'
        ]
    }
};

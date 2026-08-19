export const mockEvents = [
    {
        id: 1,
        title: "AI & Future Tech Summit",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        date: "15 September 2026",
        time: "10:00 AM - 4:00 PM",
        conductedBy: "Tech Club",
        description: "AI & Future Tech Summit is a technology-focused event designed to introduce students to emerging technologies, artificial intelligence, and future innovations. Join us for a day of insightful talks, networking, and hands-on demonstrations from industry leaders and academic pioneers.",
        venue: "KSRCE Auditorium",
        address: "K.S.R. College of Engineering",
        city: "Tiruchengode",
        status: "Registered",
        maxParticipants: 500,
        registrationDeadline: "12 September 2026",
        schedule: [
            {
                time: "10:00 AM",
                endTime: "11:00 AM",
                title: "Opening Ceremony",
                description: "Welcome and introduction to the event.",
                location: "Main Auditorium",
                speaker: "Dr. Kumar",
                type: "Ceremony"
            },
            {
                time: "11:00 AM",
                endTime: "12:00 PM",
                title: "Keynote Session",
                description: "AI and Future Technologies.",
                location: "Main Auditorium",
                speaker: "Dr. Priya",
                type: "Keynote"
            },
            {
                time: "01:00 PM",
                endTime: "02:00 PM",
                title: "Lunch Break",
                description: "Take a break and enjoy refreshments.",
                location: "Food Court",
                type: "Break" // Different visual treatment for break
            },
            {
                time: "02:00 PM",
                endTime: "04:00 PM",
                title: "Technical Workshop",
                description: "Hands-on workshop on emerging technologies.",
                location: "Innovation Lab",
                speaker: "Festra Technical Team",
                type: "Workshop"
            },
            {
                time: "04:00 PM",
                title: "Closing Ceremony",
                description: "Awards and concluding remarks."
            }
        ],
        rules: [
            "Participants must carry their college ID.",
            "Participants must arrive 15 minutes before the event.",
            "Follow the instructions provided by event volunteers.",
            "Maintain proper conduct throughout the event."
        ],
        contactEmail: "techclub@example.com",
        contactNumber: "+91 98765 43210",
        certificateAvailable: true,
        registrationStatus: "REGISTERED"
    },
    {
        id: 2,
        title: "Hackathon 2026",
        category: "Hackathon",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        date: "20 September 2026",
        time: "09:00 AM - 09:00 PM",
        conductedBy: "Coding Club",
        description: "A 12-hour intense coding hackathon where students build innovative solutions for real-world problems. Participants will have access to mentorship, free APIs, and a chance to win exciting prizes.",
        venue: "Innovation Hall",
        address: "K.S.R. College of Engineering",
        city: "Tiruchengode",
        status: "Registered",
        maxParticipants: 200,
        registrationDeadline: "18 September 2026",
        schedule: [
            { time: "09:00 AM", title: "Team Formation & Idea Pitching" },
            { time: "11:00 AM", title: "Hacking Begins" },
            { time: "07:00 PM", title: "Final Submissions" },
            { time: "08:30 PM", title: "Winner Announcements" }
        ],
        rules: [
            "Teams must consist of 2-4 members.",
            "All code must be written during the event.",
            "Use of open-source libraries is permitted."
        ],
        contactEmail: "codingclub@example.com",
        contactNumber: "+91 87654 32109",
        certificateAvailable: true,
        registrationStatus: "REGISTERED"
    },
    {
        id: 3,
        title: "Data Science Workshop",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        date: "25 September 2026",
        time: "10:30 AM - 01:30 PM",
        conductedBy: "Data Science Club",
        description: "Learn the fundamentals of Data Science, including data preprocessing, visualization, and basic machine learning algorithms using Python. Bring your laptop for a hands-on session.",
        venue: "Seminar Hall",
        address: "K.S.R. College of Engineering",
        city: "Tiruchengode",
        status: "Open",
        maxParticipants: 150,
        registrationDeadline: "23 September 2026",
        schedule: [
            { time: "10:30 AM", title: "Introduction to Data Science" },
            { time: "11:30 AM", title: "Hands-on Data Visualization" },
            { time: "01:00 PM", title: "Q&A Session" }
        ],
        rules: [
            "Laptop with Python installed is required.",
            "No prior ML experience needed."
        ],
        contactEmail: "datascience@example.com",
        contactNumber: "+91 76543 21098",
        certificateAvailable: false,
        registrationStatus: "NOT_REGISTERED"
    },
    {
        id: 4,
        title: "Cultural Fest 2026",
        category: "Cultural",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
        date: "01 October 2026",
        time: "05:00 PM - 10:00 PM",
        conductedBy: "Arts & Culture Society",
        description: "The biggest cultural event of the year featuring dance performances, music, drama, and local arts.",
        venue: "Main Ground",
        address: "K.S.R. College of Engineering",
        city: "Tiruchengode",
        status: "Open",
        maxParticipants: 2000,
        registrationDeadline: "30 September 2026",
        schedule: [
            { time: "05:00 PM", title: "Inauguration" },
            { time: "06:00 PM", title: "Dance Performances" },
            { time: "08:00 PM", title: "Musical Night" }
        ],
        rules: [
            "Open to all students.",
            "Present college ID at the entry gate."
        ],
        contactEmail: "arts@example.com",
        contactNumber: "+91 65432 10987",
        certificateAvailable: false,
        registrationStatus: "NOT_REGISTERED"
    },
    {
        id: 5,
        title: "Annual Sports Meet",
        category: "Sports",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
        date: "10 August 2026",
        time: "08:00 AM - 06:00 PM",
        conductedBy: "Physical Education Dept",
        description: "Inter-department sports competition featuring athletics, basketball, volleyball, and football.",
        venue: "Sports Complex",
        address: "K.S.R. College of Engineering",
        city: "Tiruchengode",
        status: "Completed",
        maxParticipants: 1000,
        registrationDeadline: "05 August 2026",
        schedule: [
            { time: "08:00 AM", title: "March Past" },
            { time: "09:00 AM", title: "Athletics Final" },
            { time: "04:00 PM", title: "Prize Distribution" }
        ],
        rules: [
            "Wear appropriate sports attire.",
            "Fair play is mandatory."
        ],
        contactEmail: "sports@example.com",
        contactNumber: "+91 54321 09876",
        certificateAvailable: true,
        registrationStatus: "COMPLETED"
    },
    {
        id: 7,
        title: "Robotics Exhibition",
        category: "Exhibition",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
        date: "28 October 2026",
        time: "10:00 AM - 04:00 PM",
        conductedBy: "Robotics Society",
        description: "Explore the latest models in AI-driven robotics. The exhibition includes battle bots, autonomous drones, and humanoid interactions.",
        venue: "Main Hall",
        address: "K.S.R. College of Engineering",
        city: "Tiruchengode",
        status: "Open",
        maxParticipants: 800,
        registrationDeadline: "25 October 2026",
        schedule: [
            { time: "10:00 AM", title: "Gates Open" },
            { time: "01:00 PM", title: "Drone Racing" }
        ],
        rules: ["Do not touch the operational robots.", "Photography is allowed."],
        certificateAvailable: false,
        registrationStatus: "NOT_REGISTERED"
    },
    {
        id: 8,
        title: "Startup Pitch Deck",
        category: "Competition",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
        date: "02 November 2026",
        time: "11:30 AM - 02:30 PM",
        conductedBy: "Entrepreneurship Cell",
        description: "Pitch your startup idea to a panel of angel investors and win seed funding up to $10,000.",
        venue: "Auditorium A",
        address: "K.S.R. College of Engineering",
        city: "Tiruchengode",
        status: "Open",
        maxParticipants: 50,
        registrationDeadline: "30 October 2026",
        schedule: [
            { time: "11:30 AM", title: "Pitching Starts" }
        ],
        rules: ["Strict 5-minute pitch limit."],
        certificateAvailable: true,
        registrationStatus: "NOT_REGISTERED"
    },
    {
        id: 9,
        title: "Design UX/UI Sprint",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        date: "10 November 2026",
        time: "09:00 AM - 05:00 PM",
        conductedBy: "Creative Tech",
        description: "An intensive full-day design sprint covering UX research methods and UI prototyping in Figma.",
        venue: "Design Studio",
        address: "K.S.R. College of Engineering",
        city: "Tiruchengode",
        status: "Open",
        maxParticipants: 100,
        registrationDeadline: "08 November 2026",
        schedule: [
            { time: "09:00 AM", title: "Intro to UX" }
        ],
        rules: ["Bring your laptop with Figma installed."],
        certificateAvailable: true,
        registrationStatus: "NOT_REGISTERED"
    },
    {
        id: 10,
        title: "Winter Code-A-Thon",
        category: "Hackathon",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        date: "15 December 2026",
        time: "08:00 AM - 08:00 AM",
        conductedBy: "Coding Club",
        description: "Our massive annual 24-hour winter hackathon. Food, drinks, and massive cash prizes are waiting!",
        venue: "Virtual & In-person",
        address: "K.S.R. College of Engineering",
        city: "Tiruchengode",
        status: "Open",
        maxParticipants: 1000,
        registrationDeadline: "10 December 2026",
        schedule: [
            { time: "08:00 AM", title: "Kickoff" },
            { time: "08:00 AM", title: "Next Day: Judging" }
        ],
        rules: ["Maximum 4 members per team."],
        certificateAvailable: true,
        registrationStatus: "NOT_REGISTERED"
    }
];

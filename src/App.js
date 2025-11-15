import React, { useState } from "react";
import JobCard from "./JobCard";
import { jobs } from "./jobs";
import TipsPage from "./TipsPage";
import JobPortalsPage from "./JobPortalsPage";
import "./App.css";

function App() {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [page, setPage] = useState("home"); // 'home' | 'tips' | 'portals'

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase());

        const matchesType = type === "all" || job.type === type;

        return matchesSearch && matchesType;
    });

    const renderContent = () => {
        if (page === "home") {
            return (
                <>
                    <div className="controls">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="all">All Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Internship">Internship</option>
                            <option value="Part-time">Part-time</option>
                        </select>
                    </div>

                    <div className="jobs-grid">
                        {filteredJobs.length ? (
                            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
                        ) : (
                            <p>No jobs found</p>
                        )}
                    </div>
                </>
            );
        }

        if (page === "tips") return <TipsPage />;
        if (page === "portals") return <JobPortalsPage />;

        return null;
    };

    return (
        <div>
            <nav className="navbar">
                <div className="nav-logo">Job Portal</div>
                <div className="nav-links">
                    <button
                        className={page === "home" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setPage("home")}
                    >
                        Home
                    </button>
                    <button
                        className={page === "tips" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setPage("tips")}
                    >
                        Tips
                    </button>
                    <button
                        className={page === "portals" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setPage("portals")}
                    >
                        Other Job Portals
                    </button>
                </div>
            </nav>

            <main className="container">{renderContent()}</main>
        </div>
    );
}

export default App;

const API = "http://localhost:5000/api/complaints";

let complaints = [];
let editingId = null;


// ===============================
// LOAD COMPLAINTS
// ===============================

async function loadComplaints() {

    try {

        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Failed to load complaints");
        }

        complaints = await response.json();

        displayComplaints();
        updateStats();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to the server. Make sure the backend is running.");

    }
}


// ===============================
// DISPLAY COMPLAINTS
// ===============================

function displayComplaints() {

    const list = document.getElementById("complaintList");

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const status = document.getElementById("statusFilter").value;

    const category = document.getElementById("categoryFilter").value;


    const filtered = complaints.filter(c => {

        const matchesSearch =
            c.residentName.toLowerCase().includes(search) ||
            c.roomNumber.toLowerCase().includes(search) ||
            c.description.toLowerCase().includes(search);

        const matchesStatus =
            status === "All" || c.status === status;

        const matchesCategory =
            category === "All" || c.category === category;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
        );

    });


    list.innerHTML = "";


    if (filtered.length === 0) {

        list.innerHTML = `
            <div class="complaint-card">
                <p>No complaints found.</p>
            </div>
        `;

        return;
    }


    filtered.forEach(c => {

        let statusClass = "";


        if (c.status === "Pending") {

            statusClass = "pending";

        } else if (c.status === "In Progress") {

            statusClass = "progress";

        } else {

            statusClass = "resolved";

        }


        list.innerHTML += `

            <div class="complaint-card">

                <div class="complaint-top">

                    <div>

                        <h3>
                            ${c.category} Complaint
                        </h3>

                        <p>
                            <strong>Resident:</strong>
                            ${c.residentName}
                        </p>

                    </div>


                    <span class="status ${statusClass}">
                        ${c.status}
                    </span>

                </div>


                <p>
                    <strong>Room:</strong>
                    ${c.roomNumber}
                </p>


                <p>
                    <strong>Priority:</strong>
                    ${c.priority}
                </p>


                <p>
                    <strong>Description:</strong>
                    ${c.description}
                </p>


                <p>
                    <strong>Date:</strong>
                    ${c.date}
                </p>


                <div class="actions">

                    <button onclick="viewComplaint(${c.id})">
                        View Details
                    </button>


                    <button onclick="changeStatus(${c.id})">
                        Change Status
                    </button>


                    <button onclick="editComplaint(${c.id})">
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteComplaint(${c.id})">

                        Delete

                    </button>

                </div>

            </div>

        `;

    });

}


// ===============================
// UPDATE DASHBOARD STATISTICS
// ===============================

function updateStats() {

    document.getElementById("totalCount").textContent =
        complaints.length;


    document.getElementById("pendingCount").textContent =
        complaints.filter(
            c => c.status === "Pending"
        ).length;


    document.getElementById("progressCount").textContent =
        complaints.filter(
            c => c.status === "In Progress"
        ).length;


    document.getElementById("resolvedCount").textContent =
        complaints.filter(
            c => c.status === "Resolved"
        ).length;

}


// ===============================
// OPEN NEW COMPLAINT FORM
// ===============================

function openForm() {

    editingId = null;


    document.getElementById("formTitle").textContent =
        "Submit Complaint";


    document.getElementById("complaintForm").reset();


    document.getElementById("formModal").style.display =
        "flex";

}


// ===============================
// CLOSE FORM
// ===============================

function closeForm() {

    document.getElementById("formModal").style.display =
        "none";

}


// ===============================
// SUBMIT / UPDATE COMPLAINT
// ===============================

document
    .getElementById("complaintForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();


        const complaint = {

            residentName:
                document.getElementById("residentName").value.trim(),

            roomNumber:
                document.getElementById("roomNumber").value.trim(),

            contact:
                document.getElementById("contact").value.trim(),

            category:
                document.getElementById("category").value,

            description:
                document.getElementById("description").value.trim(),

            date:
                document.getElementById("date").value,

            priority:
                document.getElementById("priority").value

        };


        // Basic frontend validation

        if (
            !complaint.residentName ||
            !complaint.roomNumber ||
            !complaint.contact ||
            !complaint.category ||
            !complaint.description ||
            !complaint.date ||
            !complaint.priority
        ) {

            alert("Please fill in all fields.");

            return;

        }


        // Contact number validation

        if (!/^[0-9]{10}$/.test(complaint.contact)) {

            alert("Please enter a valid 10-digit contact number.");

            return;

        }


        try {


            // EDIT EXISTING COMPLAINT

            if (editingId) {

                const response = await fetch(
                    `${API}/${editingId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(complaint)
                    }
                );


                if (!response.ok) {
                    throw new Error("Failed to update complaint");
                }


                alert(
                    "Complaint updated successfully!"
                );


            }


            // CREATE NEW COMPLAINT

            else {

                const response = await fetch(
                    API,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(complaint)
                    }
                );


                if (!response.ok) {
                    throw new Error("Failed to create complaint");
                }


                alert(
                    "Complaint submitted successfully!"
                );

            }


            closeForm();

            loadComplaints();


        } catch (error) {

            console.error(error);

            alert(
                "Something went wrong. Please try again."
            );

        }

    });


// ===============================
// VIEW COMPLAINT DETAILS
// ===============================

function viewComplaint(id) {

    const c = complaints.find(
        complaint => complaint.id === id
    );


    if (!c) {

        alert("Complaint not found.");

        return;

    }


    alert(

        "COMPLAINT DETAILS\n\n" +

        "Resident: " +
        c.residentName +

        "\nRoom: " +
        c.roomNumber +

        "\nContact: " +
        c.contact +

        "\nCategory: " +
        c.category +

        "\nDescription: " +
        c.description +

        "\nDate: " +
        c.date +

        "\nPriority: " +
        c.priority +

        "\nStatus: " +
        c.status

    );

}


// ===============================
// EDIT COMPLAINT
// ===============================

function editComplaint(id) {

    const c = complaints.find(
        complaint => complaint.id === id
    );


    if (!c) {

        alert("Complaint not found.");

        return;

    }


    editingId = id;


    document.getElementById("formTitle").textContent =
        "Edit Complaint";


    document.getElementById("residentName").value =
        c.residentName;


    document.getElementById("roomNumber").value =
        c.roomNumber;


    document.getElementById("contact").value =
        c.contact;


    document.getElementById("category").value =
        c.category;


    document.getElementById("description").value =
        c.description;


    document.getElementById("date").value =
        c.date;


    document.getElementById("priority").value =
        c.priority;


    document.getElementById("formModal").style.display =
        "flex";

}


// ===============================
// CHANGE COMPLAINT STATUS
// ===============================

async function changeStatus(id) {

    const complaint = complaints.find(
        c => c.id === id
    );


    if (!complaint) {

        alert("Complaint not found.");

        return;

    }


    let newStatus;


    if (complaint.status === "Pending") {

        newStatus = "In Progress";

    }

    else if (complaint.status === "In Progress") {

        newStatus = "Resolved";

    }

    else {

        newStatus = "Pending";

    }


    try {

        const response = await fetch(
            `${API}/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status: newStatus
                })

            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to change status"
            );

        }


        loadComplaints();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to change complaint status."
        );

    }

}


// ===============================
// DELETE COMPLAINT
// ===============================

async function deleteComplaint(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this complaint?"
    );


    if (!confirmed) {

        return;

    }


    try {

        const response = await fetch(
            `${API}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to delete complaint"
            );

        }


        alert(
            "Complaint deleted successfully!"
        );


        loadComplaints();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete complaint."
        );

    }

}


// ===============================
// START APPLICATION
// ===============================

loadComplaints();
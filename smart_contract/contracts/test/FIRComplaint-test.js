// Import the required libraries and artifacts
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("FIRComplaint", function () {
    // Define the contract and accounts variables
    let firComplaint;
    let owner, officer, other;

    // Deploy the contract and get the accounts
    beforeEach(async function () {
        [owner, officer, other] = await ethers.getSigners();

        const FIRComplaint = await ethers.getContractFactory("FIRComplaint");
        firComplaint = await FIRComplaint.deploy(officer.address);
        await firComplaint.deployed();
    });

    describe("fileComplaint", function () {
        it("should file a new complaint", async function () {
            // Define the complaint details
            const title = "Test Complaint";
            const description = "This is a test complaint.";

            // Get the initial nextId value
            const initialNextId = await firComplaint.nextId();

            // File the new complaint
            const tx = await firComplaint.fileComplaint(title, description);

            // Get the new complaint ID and details
            const newId = initialNextId.add(1);
            const newComplaint = await firComplaint.complaints(newId);

            // Check the new complaint details
            expect(newComplaint.id).to.equal(newId);
            expect(newComplaint.complaintRegisteredBy).to.equal(owner.address);
            expect(newComplaint.title).to.equal(title);
            expect(newComplaint.description).to.equal(description);
            expect(newComplaint.approvalRemark).to.equal("Pending Approval");
            expect(newComplaint.resolutionRemark).to.equal("Pending Resolution");
            expect(newComplaint.isApproved).to.be.false;
            expect(newComplaint.isResolved).to.be.false;
            expect(newComplaint.exists).to.be.true;

            // Check the emitted event
            const [eventId, eventRegisteredBy, eventTitle] = tx.events[0].args;
            expect(eventId).to.equal(newId);
            expect(eventRegisteredBy).to.equal(owner.address);
            expect(eventTitle).to.equal(title);

            // Check the nextId value
            const finalNextId = await firComplaint.nextId();
            expect(finalNextId).to.equal(newId.add(1));
        });
    });
    describe("approveComplaint", function () {
        it("should approve a pending complaint", async function () {
            // Define a pending complaint
            const title = "Test Complaint";
            const description = "This is a test complaint.";
            const approvalRemark = "Approved.";
            await firComplaint.fileComplaint(title, description);

            // Get the initial pending approvals
            const initialPendingApprovals = await firComplaint.pendingApprovals();

            // Approve the complaint
            const complaintId = 1;
            await firComplaint.approveComplaint(complaintId, approvalRemark);

            // Get the approved complaint details
            const approvedComplaint = await firComplaint.complaints(complaintId);

            // Check the approved complaint details
            expect(approvedComplaint.approvalRemark).to.equal(approvalRemark);
            expect(approvedComplaint.isApproved).to.be.true;

            // Check the pending approvals
            const finalPendingApprovals = await firComplaint.pendingApprovals();
            expect(finalPendingApprovals).to.have.lengthOf(
                initialPendingApprovals.length - 1
            );
            expect(finalPendingApprovals).to.not.include(complaintId);
        });

    })

});



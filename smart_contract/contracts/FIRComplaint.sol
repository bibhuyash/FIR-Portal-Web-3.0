// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FIRComplaint {
    address public officer;
    address public owner;
    uint public nextId;
    uint256[] public pendingApprovals;
    uint256[] public pendingResolutions;
    uint256[] public resolvedCases;

    constructor(address _officer) {
        owner = msg.sender;
        officer = _officer;
        nextId = 1;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not the owner of this smart contract"
        );
        _;
    }

    modifier onlyOfficer() {
        require(
            msg.sender == officer,
            "You are officer of this smart contract"
        );
        _;
    }

    struct complaint {
        uint256 id;
        address complaintRegisteredBy;
        string title;
        string description;
        string approvalRemark;
        string resolutionRemark;
        bool isApproved;
        bool isResolved;
        bool exists;
    }

    mapping(uint256 => complaint) public complaints;
    event compaintFiled(
        uint256 id,
        address complaintRegisteredBy,
        string title
    );

    function fileComplaint(
        string memory _title,
        string memory _description
    ) public {
        complaint storage newComplain = complaints[nextId];
        newComplain.id = nextId;
        newComplain.complaintRegisteredBy = msg.sender;
        newComplain.title = _title;
        newComplain.description = _description;
        newComplain.approvalRemark = "Pending Approval";
        newComplain.resolutionRemark = "Pending Resolution";
        newComplain.isApproved = false;
        newComplain.isResolved = false;
        newComplain.exists = true;
        emit compaintFiled(nextId, msg.sender, _title);
        nextId++;
    }

    function approveComplaint(
        uint256 _id,
        string memory _approvalRemark
    ) public onlyOfficer {
        require(
            complaints[_id].exists == true,
            "This Complaint id does not exists"
        );
        require(
            complaints[_id].isApproved == false,
            "This Complaint id is already Approved"
        );
        complaints[_id].isApproved == true;
        complaints[_id].approvalRemark = _approvalRemark;
    }

    function declineComplaint(
        uint256 _id,
        string memory _approvalRemark
    ) public onlyOfficer {
        require(
            complaints[_id].exists == true,
            "This Complaint id does not exists"
        );

        require(
            complaints[_id].isApproved == false,
            "This Complaint id is already Approved"
        );

        complaints[_id].exists == false;
        complaints[_id].approvalRemark = string(
            abi.encodePacked(
                "This complaint is rejected. Reason:",
                _approvalRemark
            )
        );
    }

    function resolveComplaint(
        uint256 _id,
        string memory _resolutionRemark
    ) public onlyOfficer {
        require(
            complaints[_id].exists == true,
            "This Complaint id does not exists"
        );

        require(
            complaints[_id].isApproved == true,
            "This Complaint id is not Approved"
        );
        require(
            complaints[_id].isResolved == false,
            "This Complaint id is already resolved"
        );
        complaints[_id].isResolved = true;
        complaints[_id].resolutionRemark = _resolutionRemark;
    }

    function calcPendingApprovalIds() public {
        delete pendingApprovals;
        for (uint256 i = 1; i < nextId; i++) {
            if (
                complaints[i].isApproved == false &&
                complaints[i].exists == true
            ) {
                pendingApprovals.push(complaints[i].id);
            }
        }
    }

    function calcPendingResolutionIds() public {
        delete pendingResolutions;
        for (uint256 i = 1; i < nextId; i++) {
            if (
                complaints[i].isApproved == true &&
                complaints[i].isResolved == false &&
                complaints[i].exists == true
            ) {
                pendingResolutions.push(complaints[i].id);
            }
        }
    }

    function calcResolvedIds() public {
        delete resolvedCases;
        for (uint256 i = 1; i < nextId; i++) {
            if (
                complaints[i].isResolved == true && complaints[i].exists == true
            ) {
                resolvedCases.push(complaints[i].id);
            }
        }
    }

    function setOfficerAddress(address _officer) public onlyOwner {
        owner = _officer;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScholarshipVerification {
    struct Student {
        string studentId;
        uint256 gpa;
        bool isActive;
    }

    mapping(address => Student) public students;
    address public oracle;

    modifier onlyOracle() {
        require(msg.sender == oracle, "Not authorized");
        _;
    }

    constructor() {
        oracle = msg.sender;
    }

    function registerStudent(address user, string memory studentId) public onlyOracle {
        students[user].studentId = studentId;
    }

    function updateAcademicStatus(address user, uint256 gpa, bool isActive) public onlyOracle {
        students[user].gpa = gpa;
        students[user].isActive = isActive;
    }

    function getStudent(address user) public view returns (string memory, uint256, bool) {
        Student memory s = students[user];
        return (s.studentId, s.gpa, s.isActive);
    }
}

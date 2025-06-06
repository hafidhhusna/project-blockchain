import express, { Request, Response, Router } from "express";
import {
  registerStudent,
  updateAcademicStatus,
  getStudent,
  getOracleAddress,
} from "./services/blockchain";
import students from "./mock/students.json"; // Path bisa disesuaikan

const router: Router = express.Router();

// Register student
router.post("/register/:studentId", async (req: Request, res: Response): Promise<any> => {
  const studentId = req.params.studentId;
  const student = (students as Record<string, any>)[studentId];

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const address = getOracleAddress();

  try {
    const tx = await registerStudent(address, student.studentId);
    return res.status(200).json({
      status: "success",
      txHashRegister: tx.hash,
      student,
      address,
    });
  } catch (err: any) {
    console.error("Register Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

// Update academic status 
router.post("/update/:studentId", async (req: Request, res: Response): Promise<any> => {
  const studentId = req.params.studentId;
  const student = (students as Record<string, any>)[studentId];

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const address = getOracleAddress();

  try {
    const tx = await updateAcademicStatus(address, student.gpa, student.isActive);
    return res.status(200).json({
      status: "success",
      txHashUpdate: tx.hash,
      student,
      address,
    });
  } catch (err: any) {
    console.error("Update Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

// Sync both register + update
router.post("/sync/:studentId", async (req: Request, res: Response): Promise<any> => {
  const studentId = req.params.studentId;
  const student = (students as Record<string, any>)[studentId];

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const address = getOracleAddress();

  try {
    const tx1 = await registerStudent(address, student.studentId);
    const tx2 = await updateAcademicStatus(address, student.gpa, student.isActive);

    return res.status(200).json({
      status: "success",
      txHashRegister: tx1.hash,
      txHashUpdate: tx2.hash,
      student,
      address,
    });
  } catch (err: any) {
    console.error("Sync Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

// Get student data from blockchain
router.get("/student/:address", async (req: Request, res: Response): Promise<any> => {
  const address = req.params.address;

  try {
    const student = await getStudent(address);
    return res.status(200).json({ address, student });
  } catch (err: any) {
    console.error("Get Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;

// import { useEffect, useState } from "react";
// import { authFetch } from "../../utils/api";
// import { Loader2 } from "lucide-react";

// export default function TrainingBreakdown() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await authFetch("/api/admin/training-breakdown");
//         setList(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-white p-6 rounded-xl border shadow flex items-center justify-center h-40">
//         <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
//       </div>
//     );
//   }

//   if (list.length === 0) {
//     return (
//       <div className="bg-white p-6 rounded-xl border shadow text-center text-gray-500">
//         No completed trainings yet.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-xl shadow border">
//       <h2 className="text-xl font-semibold text-blue-700 mb-4">
//         Training Completion Breakdown
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-blue-50 border-b">
//               <th className="p-3 font-medium text-blue-700">Employee</th>
//               <th className="p-3 font-medium text-blue-700">Email</th>
//               <th className="p-3 font-medium text-blue-700">Training Title</th>
//               <th className="p-3 font-medium text-blue-700">Completed On</th>
//             </tr>
//           </thead>

//           <tbody>
//             {list.map((item, i) => (
//               <tr key={i} className="border-b hover:bg-blue-50/50">
//                 <td className="p-3">{item.employeeName}</td>
//                 <td className="p-3 text-gray-600">{item.employeeEmail}</td>
//                 <td className="p-3">{item.trainingTitle}</td>
//                 <td className="p-3 text-gray-600">
//                   {new Date(item.completedAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React from 'react'

const TrainingBreakdown = () => {
  return (
    <div>TrainingBreakdown</div>
  )
}

export default TrainingBreakdown
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function UserActivity({userId}) {

  const [error, setError] = React.useState(null);
  const [commentList, setCommentList] = React.useState([]);

  const getActivity = async () => {
    fetch(`/users/activity/`+userId,{
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(
        (result) => {
          setCommentList(result);
        },
        (error) => {
          setError(error);
          console.error("Error fetching like status:", error);
        }
      );
  };

  const rows = commentList.map((comment) => ({
    userName: comment.userName,
    postId: comment.postId,
    Text: comment.text,
  }));

  React.useEffect(() => {
    getActivity();
  }, [userId]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Kullanıcı Adı</TableCell>
            <TableCell align="center">Post&nbsp;(id)</TableCell>
            <TableCell align="center">Metin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.userName}</TableCell>
              <TableCell align="center">{row.postId}</TableCell>
              <TableCell align="center">{row.Text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserActivity;
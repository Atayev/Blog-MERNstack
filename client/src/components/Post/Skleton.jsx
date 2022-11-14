import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Post.module.scss";
import { Box } from "@mui/material";
export const PostSkleton = () => {
  return (
    <Box className={styles.skleton}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" />
        <Box className={styles.skletonContent}>
          <Box className={styles.skletonUser}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              style={{ marginRight: 10 }}
            />
            <Box className={styles.skletonUserDetails}>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
                      </Box>
                  </Box>
                  <Box className={styles.skletonInfo}>
                      <Skeleton variant='text' width='80%' height={45}  v/>
                      <Box>
                      <Skeleton variant='text' width={40} height={45}  v/>
                      <Skeleton variant='text' width={40} height={45}  v/>
                      <Skeleton variant='text' width={40} height={45}  v/>
                      </Box>
                  </Box>
        </Box>
      </Stack>
    </Box>
  );
};

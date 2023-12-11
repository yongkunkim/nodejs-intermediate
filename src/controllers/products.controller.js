export class PostsController {
  constructor(postsService) {
    this.postsService = postsService;
  }
  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();
      return res.status(200).json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { nickname, password, title, content } = req.body;
      const createdPost = await this.postsService.createPost(
        nickname,
        password,
        title,
        content,
      );
      return res.status(201).json({ data: createdPost });
    } catch (err) {
      next(err);
    }
  };
  //게시글 상세조회
  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postsService.findPostById(postId);
      return res.status(200).json({ data: post });
    } catch (err) {
      next(err);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { password, title, content } = req.body;

      const updatedPost = await this.postsService.updatePost(
        postId,
        password,
        title,
        content,
      );

      return res.status(200).json({ data: updatedPost });
    } catch (err) {
      next(err);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { password } = req.body;

      const deletedPost = await this.postsService.deletePost(postId, password);
      res.status(200).json({ data: deletedPost });
    } catch (err) {
      next(err);
    }
  };
}

class Pagination {
    constructor(model, page = 1, limit = 25) {
        this.model = model;
        this.page = page;
        this.limit = limit;
        this.offset = (page - 1) * limit;
    }

    async paginate(req, res, next) {
        try {
            const { pagination } = req.query;

            // Check if pagination is disabled
            if (pagination === false) {
                const data = await this.model.findAll();
                return res.status(200).json({ data });
            }

            // Apply pagination
            const { count, rows } = await this.model.findAndCountAll({
                offset: this.offset,
                limit: this.limit,
            });

            const totalPages = Math.ceil(count / this.limit);
            console.log(totalPages);
            return res.status(200).json({
                data: rows,
                totalItems: count,
                totalPages,
                currentPage: this.page,
                perPage: this.limit,
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}
export { Pagination };

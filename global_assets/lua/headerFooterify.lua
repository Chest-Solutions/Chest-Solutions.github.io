function insertHeaderFooter(headerUrl, FooterUrl)
    local headerResponse = fetch(headerUrl)
    local footerResponse = fetch(FooterUrl)

    if headerResponse:ok() then
        local header = gurt.select("header")
        if header then
            header:append(headerResponse)
        end
    end
end